import React, { useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import MyOrders from './MyOrders'
import CartItem from './CartItem'
import { useData } from 'context/context'
import { useSession } from 'next-auth/react'
import { XIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/outline'

const Cart = () => {

    const [isOrder, setIsOrder] = useState(false)
    const { data: session } = useSession()
    const { cart, setOpenCart, deleteCart, incCount, deleteCount, handleClear, handleSizeShoe } = useData()

    const totalPrice = cart.reduce((currVal, val) => {
        return currVal += (val.price * val.count) 
    }, 0)

    const redirectLogin = () => {
        setOpenCart(false)
        Router.push('/login')
    }    

    return (
        <>
            <div className='fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-overlay z-30'></div>
            <div className='w-[300px] md:w-[400px] fixed bg-gray-50 top-0 bottom-0 right-0 shadow-md p-3 z-50 text-gray-800 overflow-y-scroll scrollbar-hide'>
                <XIcon className='h-7 text-red-400 cursor-pointer' onClick={() => setOpenCart(false)}/>
                {cart.length > 0 && <h1 className='text-center text-xl font-medium mb-5'>Cart</h1>}
    
                <div className="flex flex-col space-y-5">
                    {cart.length > 0 ? cart.map(item => (
                        <CartItem 
                            key={item?._id} 
                            item={item}
                            handleSizeShoe={handleSizeShoe}
                            incCount={() => incCount(item)}
                            deleteCount={() => deleteCount(item)}
                            deleteCart={() => deleteCart(item)}/>
                    )) : (
                        <>
                            <div className='relative h-[200px] mt-10'>
                                <Image src='/images/img-nodata.jpg' layout='fill' objectFit='contain'/>
                            </div>
                            <h1 className='text-center text-xl font-semibold'>Cart Still Empty</h1>
                        </>
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="flex items-center space-x-3 mt-5 mb-2">
                        <div className='flex-center space-x-2 btn bg-red-400 hover:bg-red-500' onClick={handleClear}>
                            <p className='text-sm md:text-base'>Clear</p>
                            <TrashIcon className='h-5'/>
                        </div>
                        <div className={`flex-center space-x-2 btn ${session?.user?.email === "admin@admin.com" ? 'bg-gray-500 hover:bg-gray-500 pointer-events-none' : ''}`}
                            onClick={() => {
                                if(session?.user) {
                                    setIsOrder(true)
                                } else {
                                    redirectLogin()
                                }
                            }}>
                            <p className='text-sm md:text-base'>
                                {session?.user ? 
                                    session?.user?.email === 'admin@admin.com' ? 'ADMIN' : 'My Order' 
                                    : 'Login'}
                                
                            </p>
                            {session?.user && session?.user?.email !== "admin@admin.com" && <ShoppingCartIcon className='h-5'/>}
                        </div>
                    </div>
                )}
                {isOrder && 
                    <MyOrders 
                        totalPrice={totalPrice} 
                        cart={cart}
                        handleCloseOrder={() => setIsOrder(false)}
                        handleCloseCart={() => setOpenCart(false)}/>
                }
            </div>
        </>
    )
}

export default Cart
