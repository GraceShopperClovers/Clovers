import axios from 'axios'
// import { createOrderProduct } from '../server/db'

function setHeaders() {
  let token = localStorage.getItem('token')
  let config = token
    ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    : {}
  return config
}

/**
 * If logged on returns user data and json web token.  If not logged on, an error will be thrown
 * And no data will be returned
 *
 * @returns {
 *      user: {
 *          email: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function checkLogin() {
  try {
    let { data } = await axios.get('/api/users/me', setHeaders())
    // if data has an id and user the user is logged on
    return data
  } catch (err) {
    console.log('checkLogin(): User is not logged on.\n', err)
    return err
  }
}

/**
 *  Login
 *
 *  @param email - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          email: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function login(email, password) {
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('login(): Unable to login.\n', err)
    // returns error to be handled.
    return err
  }
}

/**
 *  Register
 *
 *  @param email - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          email: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function register(email, password) {
  try {
    const { data } = await axios.post('/api/users/register', {
      email,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('register(): Unable to register user.\n', err)
    // returns error to be handled
    return err
  }
}

function setToken(token) {
  localStorage.setItem('token', token)
}

function setOrdernum(ordernum) {
  localStorage.setItem('ordernum', ordernum)
}

export async function createOrder(sku) {
  let orderNum = localStorage.getItem("ordernum")
  const orderData = {
    ordernum: orderNum,
    sku: sku
  }
  if (orderNum){
    try{
      const { data } = await axios.post('/api/order_products',orderData)
      return data
    }catch(error){
      console.log("boo")
    }
  }else{
    // try {
    //   let {data} = checkLogin()
    //   if (data){
    //     console.log(data)
    //     console.log("CREATE ORDER USERID", userid)
    //     const {data} = await axios.post('/api/orders',{
    //       data,
    //     })
    //     setOrdernum(data.ordernum)
    //     createOrder()
    //   }else {
    //     const {data} = await axios.post('/api/orders')
    //     console.log("DATA ELSE ", data)
    //     setOrdernum(data.ordernum)
    //     createOrder()
    //   }
    // } catch (error) {
    //   throw error
    // }
    console.log("Boo")
  }
}

