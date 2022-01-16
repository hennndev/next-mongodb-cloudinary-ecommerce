import React from 'react'
import Image from 'next/image'

const CheckoutItem = ({item}) => {
    return (
        <div className='flex justify-between space-x-3'>
            <div className='relative h-12 w-12'>
                    <Image src={item?.image?.imageURL} layout='fill' objectFit='cover'/>
            </div>
            <div className='flex-1 flex flex-col'>
                <p className='text-[15px] font-medium'>{item.name}</p>
                <div className="flex items-center space-x-3">
                    <p className='text-sm text-gray-400'>qty {item.count}</p>
                    <p className='text-sm text-gray-400'>size {item.size}</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='text-green-700 text-[15px] font-medium'>${item.price * item.count}</p>
                <p className='text-[14px] text-gray-400'>each ${item.price}</p>
            </div>
        </div>
    )
}

export default CheckoutItem
