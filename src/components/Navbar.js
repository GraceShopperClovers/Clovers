import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Navbar({ user, setUser, history }) {
  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('ordernum')
    localStorage.removeItem('useremail')
    setUser({})
    history.push('/')
    alert("Logout Successful!!!")
  }

  let userEmail = localStorage.getItem('useremail')

  return (
    <div className="header">
      <h1>Beanie Babies Emporium</h1>
      <nav>
        {userEmail ? (
          <div className = 'links'>
            <NavLink to='/Home'>Home</NavLink>
            <NavLink to='/cart'>Shopping Cart</NavLink>
            {
              <a href='#' onClick={handleLogout}>
                Log Out
              </a>
              
            }
                
          </div>
        ) : (
          <div>
    
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/cart'>Shopping Cart</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
         
          </div>
        )}
      </nav>
    </div>
  )
}

export default withRouter(Navbar)