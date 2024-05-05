import React from 'react'
import './RelatedProducts.css'
import Item from '../items/Item'
import data_product from '../assets/data'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_price} old_prices={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts