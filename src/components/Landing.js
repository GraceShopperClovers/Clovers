import React, { useState, useEffect } from 'react'
// import {getProducts} from '../utils'
import axios from 'axios'

export default function Landing() {
  //get data from API 
  const [products , setProducts] = useState('')

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get('/api/products')
    .then((response) => {
      const allProducts = response.data.products.rows;
      setProducts(allProducts)
      console.log(allProducts)
    })
    .catch(error => console.error(`Error: ${error}`))
  }
  return(
    <div>
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
                  console.log(product);
                  return(
                      <div className='products' key = {index}>
                          <h1 className="productname">{product.productname}</h1>
                          <h2 className="price">{product.price}</h2>
                          <img className ="productimage" src={product.imageurl}/>
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
