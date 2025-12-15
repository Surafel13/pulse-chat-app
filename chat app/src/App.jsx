import { useState } from 'react'
import './bootstrap.css'

import UsersBar from './Components/UsersBar/UsersBar'
import Messaging from './Components/Messaging/Messaging'
import SplashScreen from './Components/SplashScreen/SplashScreen'
import Auth from './Components/Auth/Auth'
import Verification from './Components/Verification/Verification'
import { Routes, Route } from "react-router-dom";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <></>
      )}
   <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/Messaging" element={<Messaging />} />
      <Route path="/UsersBar" element={<UsersBar />} />
    </Routes>
    

    </>
  )
}

export default App
