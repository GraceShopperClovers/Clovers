const client = require('./client')
const {getProductsBySku} = require('./products')

async function createOrderProduct({ ordernum, sku, quantity }) {
  if(!quantity){
    quantity = '1'
  }  
  try {
      const {rows: [products]} = await getProductsBySku(sku)
      const price = products.price
      const {
        rows: [orderproduct],
      } = await client.query(
        `
        INSERT INTO order_products(ordernum, sku, quantity, productprice) VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
        [ordernum, sku, quantity, price]
      )
      return orderproduct
    } catch (error) {
      throw error
    }
  }

async function getAllOrderProducts(){
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM order_products;
    `)
    return rows
  } catch (error) {
    throw error
  }
}

async function getOrderProductsByOrderNum(ordernum){
  try {
    const {rows: orderproducts} = await client.query(`
      SELECT *
      FROM order_products
      WHERE ordernum = $1;
    `, [ordernum])

    return orderproducts
  } catch (error) {
    throw error
  }

}

async function getOrderProductsByOrdernumAndSku(ordernum, sku) {
  try {
    const {rows: orderproducts} = await client.query(`
      SELECT *
      FROM order_products
      WHERE ordernum = $1
      AND sku = $2;
    `, [ordernum, sku])
    return orderproducts
  } catch (error) {
    throw error
  }
}

async function addProductsToOrder(ordernum, product) {
  try {
    let result = await createOrderProduct(ordernum, product.sku, quantity)
    return result
  } catch (error) {
    throw error
  }
}

//PATCH REQUEST TO UPDATE QUANTITY
async function updateOrderQuantity(ordernum, sku, quantity) {
  try {
    //UPDATE Quantity FIELD ON one product
    const {rows} = await client.query(`
     UPDATE order_products
     SET quantity = $1
     WHERE sku=${sku} AND ordernum = $2
     RETURNING * 
    `, [quantity, ordernum])
    return rows
  } catch(error){
    throw error
  }
}

//DELETE REQUEST TO DELETE ORDER PRODUCT
async function deleteOrderProduct(ordernum, sku){
  try {
    const {rows} = await client.query(`
      DELETE FROM order_products
      WHERE ordernum = $1 AND sku = $2
      RETURNING *;
    `, [ordernum, sku])
    return rows
  } catch (error) {
    
  }
}

  module.exports = {
    createOrderProduct,
    getAllOrderProducts,
    getOrderProductsByOrderNum,
    addProductsToOrder,
    updateOrderQuantity,
    deleteOrderProduct,
    getOrderProductsByOrdernumAndSku
  };

  