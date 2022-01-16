import React from 'react'
import Product from './Product'

const Products = ({data, page, dataSliced}) => {
    return (
        <div className='grid grid-cols-cards-mobile md:grid-cols-cards gap-5'>
            {data.slice((page - 1) * dataSliced, (dataSliced * page)).map(item => (
                <Product key={item._id} item={item}/>
            ))}
        </div>
    )
}

export default Products
