import React, { useState, useEffect } from 'react' 
import {createOrder} from '../utils'
import axios from 'axios'
import ShowSearch from './SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Landing() {
  const [products , setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts]= useState([])

  useEffect(() => {
    getAllProducts();
  }, []);


function productMatches(products, text){
  if (products.productname.toLowerCase().includes(text) || 
      products.description.toLowerCase().includes(text)){
      return true
      
  } else {
      return false
  }
}

  useEffect(()=> {
    setFilteredProducts(products.filter(product => 
      productMatches(product, searchTerm.toLowerCase())))
  },[searchTerm])

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
       <ShowSearch products = {products } setProducts = {setProducts} 
            searchTerm ={searchTerm} setSearchTerm={setSearchTerm}/>
       </div>
    <div id="prodcont">
      
       {searchTerm.length>0 ? (
        <DisplayProduct products = {filteredProducts} />
       ) : (

        <DisplayProduct products = {limmitedProducts} />
       )
}
    </div>
    <div className="pageButtons">
    {page <= 0 ? (
    <div>
       </div> ) : (
           <div>
              <button  className="lastPage" onClick={() => setPage(page - 1)}>Previous</button>
           </div>
       )
       }
          {page >= (products.length/12 -1) ? (
    <div>
       </div> ) : (
           <div>
              <button className="nextPage" onClick={() => setPage(page + 1)}>Next</button>
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
                          <ToastContainer {...props} />
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