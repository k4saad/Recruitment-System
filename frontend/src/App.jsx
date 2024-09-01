import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { LoginCandidate } from './components/authentication/LoginCandidate'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  const isLogin = location.pathname.startsWith('/login');
  const isRegister = location.pathname.startsWith('/register');
  

  return (
    <>
      {isLogin || isRegister ? (
            <Outlet />
      ) : (
        <>
          <Header />
            <Outlet />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
