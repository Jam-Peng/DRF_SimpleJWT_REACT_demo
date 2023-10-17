import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    setTimeout(() => {
      if (countdown === 0) {
        navigate("/");
      }
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown, navigate]);


  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="text-slate-800 border rounded-lg shadow-md p-10 bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <div className='text-3xl'>
            <span>404 NotFound</span>
          </div>
          <div className="text-lg">
            <span>3 秒後回首頁</span>
          </div>
          <div className="text-xl">
            <span>{countdown} 秒</span>
          </div>
          <div>
            <a href="/">
              <button className="btn-md btn-in text-base">
                回首頁
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound