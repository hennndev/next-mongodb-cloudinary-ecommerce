import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useData } from 'context/context'
import { SearchIcon } from '@heroicons/react/outline'

const Product = ({item}) => {

    const { addCart } = useData()
    const router = useRouter()

    const handleAddCart = (e, item) => {
        e.stopPropagation()
        addCart(item)
    }

    return (
        <div className={`min-h-[200px] md:min-h-[350px] shadow-md cursor-pointer hover:transform ${item?.status !== 'soldout' && 'hover:-translate-y-1'} transition duration-200 relative overflow-hidden flex flex-col group`} onClick={() => item?.status !== 'soldout' && router.push(`/sneakers/${item._id}`)}>
            {item?.status === 'soldout' && (
                <>
                    <div className='absolute w-[140px] h-[40px] bg-red-500 text-white z-30 flex-center rounded transform -rotate-45 top-3 -left-10'>
                        <p>Sold out</p>
                    </div>
                    <div className='absolute z-20 top-0 left-0 bottom-0 right-0 w-full h-full rounded bg-[rgba(0,0,0,0.4)]'/>
                </>
            )}
            <div className='relative h-[150px] md:h-[250px]'>
                <Image src={item.image.imageURL} layout='fill' objectFit='cover' className='rounded'/>
                {item.status !== 'soldout' && (
                    <div className='absolute top-0 right-0 bottom-0 left-0 group-hover:bg-[rgba(0,0,0,0.6)] flex-center'>
                        <SearchIcon className='h-8 text-white opacity-0 group-hover:opacity-100'/>
                    </div>
                )}
            </div>
            <div className='p-[10px] text-center text-gray-700 flex-1 flex-between flex-col'>
                <div>
                    <h1 className='font-medium text-[10px] md:text-base line-clamp-2'>{item?.name}</h1>
                    <p className='text-bold text-[15px] md:text-2xl mt-1 font-bold text-green-600'>
                        ${item?.price}
                    </p>
                </div>
                <button className='mt-2 text-sm btn' onClick={(e) => handleAddCart(e, item)}>Add Cart</button>
            </div>
        </div>
    )
}

export default Product
