import React, { useState, useEffect } from 'react' 
import {createOrder} from '../utils'
import axios from 'axios'
import ShowSearch from './SearchBar'

export default function Landing() {
  const [products , setProducts] = useState('')
  const [page, setPage] = useState(0)
 
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
  let limmitedProducts = products.slice(0 + page * 12, page*12 + 12)
  return(
    <div>
      <div className="searchParent">
       <ShowSearch products = {products} />
       </div>
    <div id="prodcont">
       
        <DisplayProduct products = {limmitedProducts} />
    </div>
    <div className="pageButtons">
    {page <= 0 ? (
    <div>
       </div> ) : (
           <div>
              <button  className="lastPage" onClick={() => setPage(page - 1)}>Previous 12</button>
           </div>
       )
       }
          {page >= (products.length/12 -1) ? (
    <div>
       </div> ) : (
           <div>
              <button className="nextPage" onClick={() => setPage(page + 1)}>Next 12</button>
           </div>
       )
       }
     </div>
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
