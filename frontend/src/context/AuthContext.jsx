import { createContext, useCallback, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [authToken, setAuthToken] = useState(()=>localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null)
  const [currentUser, SetCurrentUser] = useState(()=>localStorage.getItem("authToken") ? jwt_decode(localStorage.getItem("authToken")) : null)
  const [loading, setLoading] = useState(true)

  // 登入
  const loginUser = async (e) => {
    e.preventDefault()
    let response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({"username": e.target.username.value, "password": e.target.password.value})
    })
    const data = await response.json()
    if (response.status === 200) {
      setAuthToken(data)                                          // 儲存 access 和 refresh token
      SetCurrentUser(jwt_decode(data.access))                     // 解碼 access token
      localStorage.setItem("authToken", JSON.stringify(data));    // 將 token儲存到 localStorage
      navigate('/')
    } else {
      alert('無法取得連線')
    }
  }

  // 登出
  const logoutUser = useCallback(() => {
    setAuthToken(null)
    SetCurrentUser(null)
    localStorage.removeItem("authToken");
    navigate('/')
  },[navigate]) 
  

  // 更新 token
  const updateToken = useCallback(async () => {
    console.log("更新token被觸發")
    let response = await fetch("http://127.0.0.1:8000/api/v1/token/refresh/", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ "refresh": authToken?.refresh})
    })
    const data = await response.json()
    if (response.status === 200) { 
      setAuthToken(data)                                         
      SetCurrentUser(jwt_decode(data.access))                     
      localStorage.setItem("authToken", JSON.stringify(data)); 
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  },[authToken?.refresh, loading, logoutUser]) 

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    const fourMinutes = 4 * 60 * 1000      // 因為後端設定 token到期時間為 5分鐘，這裡設定 4分鐘後使用 refresh token重新取得新 token
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  },[authToken, loading, updateToken])


  const contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    currentUser: currentUser,
    authToken: authToken,
  }

  return (
    <AuthContext.Provider value={contextData}>
      { loading ? null : children }
    </AuthContext.Provider>
  )
}

export default AuthProvider