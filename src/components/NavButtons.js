import React from 'react' 

export default function Buttons(props){
    const {page, setPage, products} = props
    return(
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
    )
}