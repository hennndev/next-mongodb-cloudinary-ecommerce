import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useData } from 'context/context'
import CheckoutItem from '@/components/Checkout/CheckoutItem'
import CheckoutForm from '@/components/Checkout/CheckoutForm'

const Checkout = () => {

    const { dataCheckout, setDataCheckout, setCart } = useData()

    useEffect(() => {
        if(!dataCheckout) {
            Router.replace('/')
        }
    }, [dataCheckout])

    const handleReplaceDataToCart = () => {
        setCart(dataCheckout.orders)
        setDataCheckout(null)
    }

    return (
        <>
            <Head>
                <title>Checkout | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="my-6">
                <h1 className='text-center text-2xl text-blue-500 font-medium'>Checkout</h1>
                <div className='mt-7 flex space-y-5 flex-col md:space-y-0 md:flex-row md:space-x-10 text-gray-800 min-h-[200px]'>
                    <div className='bg-white shadow-lg p-5 rounded flex-1 h-max'>
                        <h1 className='text-2xl mb-10 '>
                            Total Price: {' '}
                            <span className='text-green-700 md:text-3xl font-semibold'>US${dataCheckout?.totalPrice}.89</span>
                        </h1>
                        <div className='flex flex-col space-y-7'>
                            {dataCheckout?.orders.map(item => (
                                <CheckoutItem key={item._id} item={item}/>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white shadow-lg p-5 rounded flex-[0.7]'>
                        <CheckoutForm totalPrice={dataCheckout?.totalPrice}  
                            dataOrders={dataCheckout?.orders} 
                            handleReplaceDataToCart={handleReplaceDataToCart}/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
