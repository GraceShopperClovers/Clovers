import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin, getProducts } from './utils'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const setLogIn = async () => {
      let data = await checkLogin()
      console.log("DATA INSIDE USE EFFECT: ", data)
      if (data.userid) {
        setUser(data)
        console.log("INSIDE APP.js USER 1:", user)
      }
      console.log("INSIDE APP.js USER 2:", user)
    }
    setLogIn()
  }, [])
  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </div>
  )
}



export default App
