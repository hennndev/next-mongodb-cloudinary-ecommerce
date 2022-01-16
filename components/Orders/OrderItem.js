import React from 'react'
import Image from 'next/image'
import moment from 'moment'

const OrderItem = ({order, data}) => {
    return (
        <div className="flex flex-col md:flex-row border-t border-gray-300 pt-5">
            <div className='flex flex-1'>
                <div className="relative h-[100px] w-[100px] md:h-[150px] md:w-[150px]">
                    <Image src={data?.imageURL} layout='fill' objectFit='cover'/>
                </div>
                <div className='px-3 flex-1 flex flex-col space-y-1'>
                    <h1>- {data?.name}</h1>
                    <p>- US $899</p>
                    <p>- qty: {data.count}</p>
                    <p>- size: {data.size}</p>
                </div>

            </div>
            <div className="flex-1 flex space-x-5">
                <div className='mt-5 md:mt-10 flex-1'>
                    <h1 className='text-left md:text-center font-medium '>
                        Status: <br />
                        <span className={`${order.status}`}>{order.status.toUpperCase()}</span>
                    </h1>
                </div>
                <div className='mt-5 md:mt-10 flex-1 text-left md:text-center'>
                    <h1>Delivery Expected by: <br />
                        <span className='font-medium'>
                            {moment(new Date(new Date().setDate(new Date(order?.createdAt).getDate() + 2))).format('LL')}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default OrderItem
