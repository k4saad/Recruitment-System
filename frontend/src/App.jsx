import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { LoginCandidate } from './components/authentication/LoginCandidate';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ClientSideBar from './components/layout/ClientSideBar';
import CandidateSideBar from './components/layout/CandidateSideBar';
import AdminSideBar from './components/layout/AdminSideBar';

function App() {
  const location = useLocation();  // use useLocation to get location.pathname

  const isLogin = location.pathname.startsWith('/login');
  const isRegister = location.pathname.startsWith('/register');
  const isForgotPassword = location.pathname.startsWith('/forgot-password')
  const isResetPassword = location.pathname.startsWith('/reset-password')
  const isInterview = location.pathname.startsWith('/interview');
  const isClient = location.pathname.startsWith('/client');
  const isCandidate = location.pathname.startsWith('/candidate');
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {isLogin || isRegister || isInterview || isForgotPassword || isResetPassword ? (
        <Outlet />
      ) : (
        <>
          {isClient ? (
            <div className="h-screen flex">
              <div className="flex flex-1">
                <ClientSideBar />
                <div className="flex-1 p-4 overflow-y-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : isCandidate ? (
            <div className="h-screen flex">
              <div className="flex flex-1">
                <CandidateSideBar />
                <div className="flex-1 p-4 overflow-y-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : isAdmin ? (
            <div className="h-screen flex">
              <div className="flex flex-1">
                <AdminSideBar/>
                <div className="flex-1 p-4 overflow-y-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : (
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
