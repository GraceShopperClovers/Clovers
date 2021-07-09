import React from 'react' 

export default function ShowSearch (props) {
    const { setProducts, searchTerm, setSearchTerm } = props
  
function clearForm(){
    setSearchTerm('')
    setProducts(props.products)
}
return(
        <div className ="searchBar">
          <label id='searchTitle'>Search Products </label>
          <input 
              id = 'search' 
              type = 'text' 
              placeholder = '...keyword...'
              value = {searchTerm}
              onChange = {(event) => {
                  setSearchTerm(event.target.value)
                }}

          />
          <button className="clearSearch" onClick={()=>clearForm()} >Clear Search</button>
        </div>
        )
}