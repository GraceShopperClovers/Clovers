import React, { useState, useEffect } from 'react' 
import {createOrder} from '../utils'
import axios from 'axios'

export default function Landing() {
  const [products , setProducts] = useState('')

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get('/api/products')
    .then((response) => {
      const allProducts = response.data.products.rows;
      setProducts(allProducts)
    })
    .catch(error => console.error(`Error: ${error}`))
  }
  return(
    <div id="prodcont">
        <DisplayProduct products = {products} />
    </div>
  )
}

function DisplayProduct(props) {

  const showProducts = (props) => {
      const {products} = props

      if(products.length > 0 ) {
          return(
              products.map((product, index) => {
                  return(
                      <div className='products' key = {index}>
                        <img className ="productimage" src={product.imageurl}/>
                          <h1 className="productname">{product.productname}</h1>
                          <h2 className="price">Price: ${product.price}</h2>
                          <h2 className="description">{product.description}</h2>
                          <button type="button" className="addtocart" onClick={()=>{createOrder(product.sku)}}>Add to Cart</button>
                      </div>
                  )
              })
          )
      }
    }
  return(
      <>
          {showProducts(props)}
      </>
  )
}
