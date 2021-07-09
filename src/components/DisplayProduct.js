import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function DisplayProduct(props){
    const {cart, setDisplayCart, displayCart} = props
    let orderTotal = 0
    const [checkedout, setCheckedout] = useState(false)

    async function checkout() {
        const ordernum = localStorage.getItem('ordernum')
        await axios.patch(`/api/orders/${ordernum}`)
        localStorage.removeItem('ordernum')
        setCheckedout(true)
    }

    async function deleteProduct({sku}){
        const ordernum = localStorage.getItem('ordernum')
        await axios.delete(`/api/orderproducts/${ordernum}/sku/${sku}`)
        setDisplayCart(!displayCart)
    
    }
    
    async function updateQuantity(event, product){
        const {sku} = product
        const quantity = event.target.value
        const ordernum = localStorage.getItem('ordernum')
        let updatedOrderData = {
            ordernum: ordernum,
            sku: sku,
            quantity: quantity
          }
        await axios.patch(`/api/orderproducts/${ordernum}`, updatedOrderData)
        setDisplayCart(!displayCart)
    }

    if (checkedout === true) {
        return <Redirect to='/checkout' />
    }

    return(
        <div>
        {cart.length >0 ? 
           
                <div className="Cartpage">
                  <h1 className="title">Cart</h1>
                {cart.sort().map((product) => {
                    orderTotal = orderTotal + (product.productprice * product.quantity)
                    return(
                        <div className="Cart"key={product.productname}>
                            <div className="image">
                                <img className ="cartproductimage" src={product.imageurl}/>
                            </div>
                            <div className='cartProducts' >
                                <h1 className="productname">{product.productname}</h1>
                                <h2 className="price">Price: ${product.productprice}</h2>
                                <h2 className="quantity"> <label>Quantity:  </label>
                                    <select className='quantity' onChange={(event)=>{updateQuantity(event, product)}}>
                                        <option>{product.quantity}</option> 
                                        <option>1</option> 
                                        <option>2</option> 
                                        <option>3</option> 
                                        <option>4</option> 
                                        <option>5</option> 
                                        <option>6</option> 
                                        <option>7</option> 
                                        <option>8</option> 
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </h2>
                                <button  onClick={()=>{
                                    deleteProduct(product)
                                }}>Remove from Cart</button>
                            </div>
                            <div className="total">
                                <h1>Total: ${`${product.productprice}`*`${product.quantity}`}</h1>
                            </div>
                        </div>
                    )
                })}
                <div className="orderTotal">
                    <h1>Order Total: ${orderTotal}</h1>
                </div>
                
                <div className="checkout">
                <button onClick={()=>{
                                    checkout()
                                }}>Checkout!</button>
                </div>
                </div>
                
         :(
             ( <div className="emptyCart"><div className="emptyCart1">Your Cart is Empty</div></div> )
          )
        } </div>
    )
}


