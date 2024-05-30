import NavBar from '@/components/navbar'
import Layout from '@/components/layout'
import Footer from '@/components/footer'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import type { AppProps } from 'next/app'
import Login from './login'

export default function App({ Component, pageProps }: AppProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
    
    
      <div className="div">
        <Layout></Layout>
        <Component {...pageProps} isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
        <Footer></Footer>
      </div>
    </>
    
  )
  
    
}
