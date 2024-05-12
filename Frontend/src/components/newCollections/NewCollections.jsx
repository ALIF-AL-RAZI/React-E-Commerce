import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collection from '../assets/new_collections'
import Item from '../items/Item'

const NewCollections = () => {
  const [new_collection, SetNew_collection] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/newcollection")
    .then((res)=>res.json())
    .then((data)=>SetNew_collection(data));
  },[])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='collections'>
            {new_collection.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_price} old_prices={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections