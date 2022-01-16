import React from 'react'
import Image from 'next/image'

const NoData = ({title}) => {
    return (
        <div className='flex-center flex-col mt-10 text-center'>
            <div className='relative h-[350px] w-[350px]'>
                <Image src='/images/img-nodata.jpg' layout='fill' objectFit='cover'/>
            </div>
            <h1 className='font-medium text-2xl text-gray-700'>{title}</h1>
        </div>
    )
}

export default NoData
