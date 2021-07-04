import axios from 'axios'

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


export async function createOrder(sku){
  let orderNum = localStorage.getItem("ordernum")
  let myInfo = await checkLogin()
  console.log("orderNum: ", orderNum)
  console.log("my Info:", myInfo)
  if (orderNum){
    console.log("inside the if....")
    let orderData = {
      ordernum: orderNum,
      sku: sku
    }
    await axios.post('/api/orderproducts', orderData)

    alert("this product has been added to your cart")
  } else {
    if (myInfo){
      console.log("inside the else if...")
      const order = await axios.post('api/orders', myInfo)
      const newOrderNum = order.data.ordernum
      console.log("order number: ", newOrderNum)
      setOrdernum(newOrderNum)
      createOrder(sku)
    } else {
      console.log("inside the else else....")
      const order = await axios.post('api/orders', {orderuserid: null})
      const newOrderNum = order.data.ordernum
      setOrdernum(newOrderNum)
      createOrder(sku)
    }
  }
}

