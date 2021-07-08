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
      {/* <h1>Beanie Babies Emporium</h1> */}
      
      <span>B</span>
      <span>E</span>
      <span>A</span>
      <span>N</span>
      <span>I</span>
      <span>E</span>
      <span> </span>
      <span>B</span>
      <span>A</span>
      <span>B</span>
      <span>I</span>
      <span>E</span>
      <span>S</span>
      <span> </span>
      <span>E</span>
      <span>M</span>
      <span>P</span>
      <span>O</span>
      <span>R</span>
      <span>I</span>
      <span>U</span>
      <span>M</span>
  
      <nav>
        {userEmail ? (
          <div className = 'links'>
            <NavLink to='/Home'>Home</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
            {
              <a href='#' onClick={handleLogout}>
                Logout
              </a>
              
            }
                
          </div>
        ) : (
          <div>
    
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Join</NavLink>
         
          </div>
        )}
      </nav>
    </div>
  )
}

export default withRouter(Navbar)