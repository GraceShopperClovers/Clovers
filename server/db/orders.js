const client = require('./client')

async function createOrder({orderuserid}){
    try {
        const {
            rows: [order],
          } = await client.query(
            `
            INSERT INTO orders(orderuserid) VALUES ($1)
            RETURNING *
          `,
            [orderuserid]
          )
          const orderNum = order.ordernum

          //Wouldnt we call this on a add to cart button 
            //and store in local storage then

            //Can't use localStorgae on DB side

          // window.localStorage.setItem('ordernum', orderNum)
          
          return order
    } catch (error) {
        throw error
    }

}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM orders;
    `)
    return { rows }
  } catch (error) {
    throw error
  }
}



module.exports = {
  createOrder,
  getAllOrders,
}