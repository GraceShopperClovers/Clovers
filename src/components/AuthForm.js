import React, { useState } from 'react'
import axios from 'axios'
import { login, register, setOrdernum } from '../utils'

function setUserEmail(email) {
  localStorage.setItem('useremail', email)
}

async function setOpenUserOrder(userid){
  try {
    const {data: [rows]} = await axios.get(`/api/orders/user/${userid}`)
    console.log("openOrder: ", rows)
    if (rows){
      setOrdernum(rows.ordernum)
    }
    return
  } catch (error) {
    console.error(error)
  }
  

}

function AuthForm(props) {
  let { type, setUser } = props // type of auth form (login or signup) and isLoggedIn Function
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(evt) {
    evt.preventDefault()

    if (!email || !password) {
      return // need to fill out username and password
    } else {
      try {
        let data =
          type === 'login'
            ? await login(email, password)
            : await register(email, password)
        if (data.user) {
          await setEmail('')
          await setPassword('')
          await setUser(data.user)
          setUserEmail(data.user.email)
          setOpenUserOrder(data.user.userid)
          props.history.push('/home') // send it home
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className ="formBox">
    <form className='AuthForm' onSubmit={handleSubmit}>
      <h1 className='title'>{type === 'login' ? 'Log In' : 'Register'}</h1>
      <div>
        
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          value={email}
          type='text'
          placeholder='Type your email'
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          value={password}
          type='password'
          placeholder='Type your password'
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button className = "button" type='submit'>{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
    </div>
  )
}

export default AuthForm
