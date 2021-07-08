import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function Cart() {
    const [cart , setCart] = useState('')
    
    let orderNum = localStorage.getItem("ordernum")

    const getOrder = async () => {
        let { data } = await axios.get(`/api/orders/${orderNum}`)
        if (data) {
            const orderProducts = data.products
            setCart(orderProducts)
        } else {
            return
        }
    }

    useEffect(() => {
        if (orderNum) {
            getOrder()
        }
    }, [])

    return (
        <div id="ShoppingCart">
        {orderNum ? 
        ( <DisplayProduct cart = {cart} /> )
        :
        ( <div className="emptyCart"><div className="emptyCart1">Your Cart is Empty</div></div> )
        }
        </div>
    )
} 



function DisplayProduct(props){

    const [checkedout, setCheckedout] = useState(false)

    async function checkout() {
        const ordernum = localStorage.getItem('ordernum')
        await axios.patch(`/api/orders/${ordernum}`)
        localStorage.removeItem('ordernum')
        setCheckedout(true)
    }

    if (checkedout === true) {
        return <Redirect to='/checkout' />
    }

    const showCart = (props) => {
        const {cart} = props
        let orderTotal = 0
        if(cart.length>0){
            return (
                <div className="Cartpage">
                  <h1 className="title">Cart</h1>
                {cart.map((product, index) => {
                    orderTotal = orderTotal + (product.productprice * product.quantity)
                    return(
                        <div className="Cart"key={index}>
                            <div className="image">
                                <img className ="productimage" src={product.imageurl}/>
                            </div>
                            <div className='cartProducts' key = {index}>
                                <h1 className="productname">{product.productname}</h1>
                                <h2 className="price">Price: ${product.productprice}</h2>
                                <h2 className="quantity"> <label>Quantity:</label>
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
            )
        }else if (cart.length === 0){
           return  ( <div className="emptyCart"><div className="emptyCart1">Your Cart is Empty</div></div> )
        }
        
    }
    return(
      <>
          {showCart(props)}
      </>
  )

}

async function deleteProduct({sku}){
    const ordernum = localStorage.getItem('ordernum')
    await axios.delete(`/api/orderproducts/${ordernum}/sku/${sku}`)
    window.location.reload(false)
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
    window.location.reload(false)
}

