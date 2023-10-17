import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <section className='text-gray-800 bg-gray-100 '>
      <div className='container mx-auto'>
        <Header />
        <div className="min-h-screen">
          <Outlet/>
        </div>
        
      </div>
      <div className='fixed bottom-0 w-full bg-gray-200'>
        <Footer/>
      </div>
    </section>
  )
}

export default Dashboard