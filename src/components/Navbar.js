import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'


function Navbar({ user, setUser, history }) {
  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('ordernum')
    localStorage.removeItem('useremail')
    setUser({})
    history.push('/')
    toast.success('🦄 Logout Successful!!!',{ autoClose: 3000})

    // alert("Logout Successful!!!")
  }

  let userEmail = localStorage.getItem('useremail')

  return (
    <div className="header">
      {/* <h1>Beanie Babies Emporium</h1> */}
      
      <span>C</span>
      <span>L</span>
      <span>O</span>
      <span>V</span>
      <span>E</span>
      <span>R</span>
      <span>'</span>
      <span>S</span>
      <span> </span>
      <span>C</span>
      <span>O</span>
      <span>L</span>
      <span>L</span>
      <span>E</span>
      <span>C</span>
      <span>T</span>
      <span>I</span>
      <span>O</span>
      <span>N</span>
  
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