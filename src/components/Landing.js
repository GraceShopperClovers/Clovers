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
    <div id="prodcont">
        <DisplayProduct products = {products} />
    </div>
  )
}

function DisplayProduct(props) {
//   function ShowDiv(productname) {
//     document.getElementById(productname).style.display = "";
// }


  const showProducts = (props) => {
      const {products} = props

      if(products.length > 0 ) {
          return(
              products.map((product, index) => {
                  console.log(product);
                  //let productname = product.productname
                  return(
                      <div className='products' key = {index}>
                        <img className ="productimage" src={product.imageurl}/>
                          <h1 className="productname">{product.productname}</h1>
                          <h2 className="price">Price: ${product.price}</h2>
                          {/* <button type="button" className="collapsible"  onclick={ShowDiv(productname)}>More info</button> */}
                            {/* <div id={product.productname}> */}
                          <h2 className="description">{product.description}</h2>
                            {/* </div> */}
                          <button type="button" className="addtocart">Add to Cart</button>
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
