import React, { useState, useEffect } from 'react'
import {getProducts} from '../utils'
import Axios from 'axios'

function Landing() {
  //return <div className='landing'>This is a landing page</div>
  // const productList = getProducts()
  
  // console.log(productList.rows)
  // return <div>{productList}</div>

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "/api/products"
    );
    const products = products.data;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <p key={product.productname}>{product.description}</p>
      ))}
    </div>
  );
}

export default Landing
