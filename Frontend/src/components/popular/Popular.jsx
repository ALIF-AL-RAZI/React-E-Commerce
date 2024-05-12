import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../assets/data'
import Item from '../items/Item'


const Popular = () => {
  const [data_product, Setdata_product] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/popularinwomen")
    .then((res)=>res.json())
    .then((data)=>Setdata_product(data));
  },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
            {data_product.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_price} old_prices={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular