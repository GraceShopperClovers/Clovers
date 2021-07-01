import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Navbar({ user, setUser, history }) {
  function handleLogout() {
    localStorage.removeItem('token')
    setUser({})
    history.push('/')
  }

  return (
    <div className="header">
      <h1>Beanie Babies Emporium</h1>
      <nav>
        {user.id ? (
          <div>
            <NavLink to='/Home'>Home</NavLink>
            {
              <a href='#' onClick={handleLogout}>
                Log Out
              </a>
            }
          </div>
        ) : (
          <div>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/'>Home</NavLink>

          </div>
        )}
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
