import React, { useState } from 'react'
import Image from 'next/image'
import SizeForm from '../UI/SizeForm'
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline'

const CartItem = ({item, handleSizeShoe, deleteCart, deleteCount, incCount}) => {

    const [valSize, setValSize] = useState(item?.size || '36')

    const handleChange = (value) => {
        setValSize(value)
        handleSizeShoe(item._id, value)
    }
    

    return (
        <div className='shadow-md bg-white p-2 rounded flex min-h-[100px] hover:transform hover:-translate-y-1 transition duration-300'>
            <div className='relative h-[100px] w-[100px] mr-5'>
                <Image src={item?.image?.imageURL} layout='fill' objectFit='contain'/>
            </div>
            <div className='flex-1 flex justify-between flex-col'>
                <div className='flex flex-col space-y-2'>
                    <h1 className='font-medium text-sm md:text-base leading-6'>{item.name}</h1>
                    <div className="flex items-center space-x-2">
                        <MinusCircleIcon className='h-5 text-gray-600 cursor-pointer'
                            onClick={deleteCount}/>
                        <span className='text-sm'>{item.count}</span>
                        <PlusCircleIcon className='h-5 text-gray-600 cursor-pointer' 
                            onClick={incCount}/>
                    </div>
                    <div className="flex items-center space-x-3">
                        <h1>Size: </h1>
                        <SizeForm item={item} valSize={valSize} handleChange={(e) => handleChange(e.target.value)}/>
                    </div>
                </div>
        
                <div className="flex-between mt-3">
                    <button className="btn bg-red-400 hover:bg-red-500 text-[12px] md:text-sm py-1 w-max" onClick={deleteCart}>Delete</button>
                    <h1 className='text-green-600 font-medium text-sm md:text-lg'>
                        ${item.price * item.count}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default CartItem
