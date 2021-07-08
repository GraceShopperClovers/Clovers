const { user } = require('./client')
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

async function getOrderByOrdernum(ordernum) {
  try {
    const { rows: [order] } = await client.query(`
    SELECT *
    FROM orders
    WHERE ordernum=$1;
    `, [ordernum])

    if (!order) {
      throw {
        name: "OrderNotFoundError",
        message: "Could not find an order with that ordernum"
      }
    }

    const { rows: products } = await client.query(`
      SELECT products.sku, products.imageurl, products.productname, order_products.productprice, order_products.quantity
      FROM products
      INNER JOIN order_products ON products.sku = order_products.sku
      WHERE ordernum=$1;
    `, [ordernum])


    order.products = products

    return order
  } catch (error) {
    throw error
  }
}

async function getOpenOrdersByUserId(userid){
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM orders
      WHERE isopen = true AND orderuserid = $1
    `, [userid])
    return rows
  } catch (error) {
    throw error
  }
}

//PATCH REQUEST TO UPDATE ORDER TO CLOSED
async function updateOrder(ordernum) {
  try {
    //UPDATE isopen FIELD
    const {rows} = await client.query(`
     UPDATE orders
     SET isopen = false
     WHERE ordernum = $1
     RETURNING * 
    `, [ordernum])
    return rows
  } catch(error){
    throw error
  }
}


module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrdernum,
  getOpenOrdersByUserId,
  updateOrder
}