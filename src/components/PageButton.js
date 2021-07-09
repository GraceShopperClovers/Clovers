import React from 'react' 


export default function PageButtons(props){
    const { setPage, page , products} = props

return(
<div>
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