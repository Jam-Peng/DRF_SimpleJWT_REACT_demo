import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"
// import { IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function Login() {
  document.title = '登入'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser } = useContext(AuthContext)

  return (
    <section>
      <div className="flex justify-center items-center p-4 sm:p-10">
        <div className="w-full sm:w-5/12 border rounded-md overflow-hidden bg-gray-200">
          <div className="py-2 px-4 bg-gray-500 text-gray-100">
            <span>會員登入</span>
          </div>
          <div className="py-6 px-4 ">
            <form action="" className="space-y-4" onSubmit={loginUser}>
              <div className="flex items-center space-x-2">
                <label htmlFor="username">
                  <PiUserCircle size={30} />
                </label>
                <div className="w-10/12">
                  <input id="username" name="username" type="text" autoComplete="username" required
                    placeholder="Account / 會員帳號"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="password">
                  <PiLockKeyLight size={30}/>
                </label>
                <div className="w-10/12">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                    placeholder="Password / 會員密碼" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input_set"/>
                </div>
              </div>
              <div className="text-start pt-4">
                <button
                  className ="btn-md btn-in "
                  type="submit"
                >
                  <span>登入</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Login