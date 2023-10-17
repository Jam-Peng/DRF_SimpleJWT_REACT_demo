import { useContext } from "react"
import { BiLogOut } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"


function Header() {
  const { currentUser, logoutUser } = useContext(AuthContext)

  return (
    <header>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <div>
            <Link to={'/'} rel="noopener noreferrer">
              <span className="text-xl font-medium text-emerald-500">LOGO</span>
            </Link>
          </div>
        
          <div>
            <Link to={'/course'} rel="noopener noreferrer">
              <span className="text-[1.1rem]">產品頁</span>
            </Link>
          </div>
        </div>
        
        <div className="text-base place-items-center">
          {currentUser ? 
            <div className="grid grid-cols-2 space-x-2">
              <div>
                <span>{currentUser.username}</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer" onClick={logoutUser}>
                <BiLogOut size={25}/>
                <span className="">登出</span>
              </div> 
            </div>
            :
            <div>
            <Link to={'/login'} className="flex items-center space-x-1">
              <FaUser size={17}/>
              <span className=""> 登入</span>
            </Link>
          </div>
          }
          
          
        </div>
      </div>
    </header>
  )
}

export default Header