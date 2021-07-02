import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import Landing from './components/Landing'
import Cart from './components/Cart'

function Routes(props) {
  const { user, setUser } = props
  return (
    <Switch>
      <Route
        path='/login'
        render={(props) => (
          <AuthForm type='login' {...props} setUser={setUser} />
        )}
      />
      <Route
        path='/signup'
        render={(props) => (
          <AuthForm type='register' {...props} setUser={setUser} />
        )}
      />
      <Route path='/home' component={Landing} />

      <Route path='/cart' component={Cart} />

      <Route path='/' component={Landing} />
      
    </Switch>
  )
}

export default withRouter(Routes)
