import { useState } from 'react'
import './bootstrap.css'

import Header from './Components/UserMessagingPage.jsx/Header'
import MessagingPage from './Components/ChatPage/MessagingPage'
import SplashScreen from './Components/SplashScreen/SplashScreen'
import Auth from './Components/Auth/Auth'
import Verification from './Components/Verification/Verification'

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Header />
      )} */}
      {/* <Auth/> */}

      <Verification/>


    </>
  )
}

export default App
