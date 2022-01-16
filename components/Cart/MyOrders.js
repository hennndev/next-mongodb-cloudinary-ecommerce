import React from 'react'
import Modal from '../UI/Modal'
import Router from 'next/router'
import { useData } from 'context/context'

const MyOrders = ({totalPrice, cart, handleCloseOrder, handleCloseCart}) => {

    const { setDataCheckout, setCart } = useData()

    const handleCheckout = () => {
        handleCloseOrder()
        handleCloseCart()
        setDataCheckout({
            totalPrice,
            orders: cart
        })
        setCart([])
        Router.push('/checkout')
    }

    return (
        <Modal info>
            <h1 className='text-center font-bold text-lg text-gray-600'>My Orders</h1>
            <div className='mt-2'>
                <p className='mb-1 font-medium'>Total Product:</p>
                {cart.map((item, idx) => (
                    <p className='ml-5 text-[14px] font-medium mb-2' key={item.name}>{idx + 1}. {item?.name} ({item.count}X) ({item.size})</p>
                ))}
            </div>
            <div className='mt-2 flex items-center space-x-2 text-lg'>
                <p className='mb-1 font-medium'>Total Price: </p>
                <p className='font-medium text-green-700'>${totalPrice}</p>
            </div>
            <div className="flex items-center space-x-3 mt-5">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleCloseOrder}>Cancel</button>
                <button className='btn' onClick={handleCheckout}>Go To Checkout</button>
            </div>
        </Modal>
    )
}

export default MyOrders
