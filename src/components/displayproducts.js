export default function DisplayProduct(props) {

    const showProducts = (props) => {
        const {products} = props

        if(products.length > 0 ) {
            return(
                products.map((product, index) => {
                    console.log(product);
                    return(
                        <div className='products' key = {index}>
                            <h1 className="productname">{product.productname}</h1>
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