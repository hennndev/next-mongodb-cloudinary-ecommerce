import React, { useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import Image from 'next/image'
import Router from 'next/router'
import { fetchAPI } from 'utils/utils'
import Modal from '@/components/UI/Modal'
import { getSession } from 'next-auth/react'
import RequestModal from '@/components/UI/RequestModal'
import SuccessModal from '@/components/UI/SuccessModal'
import { XCircleIcon, QuestionMarkCircleIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/outline'
import NoData from '@/components/UI/NoData'

const Orders = ({data}) => {

    const [isCancel, setIsCancel] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const cancelledOrders = (id) => {
        fetch(`/api/orders/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newStatus: 'cancelled'})
        })
            .then((res) => res.json())
            .then(() => {
                setIsCancel(null)
                Router.replace('/orders')
                setIsSuccess(true)
            })
    }


    const removeOrder = (id) => {
        fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then(() => {
            Router.replace('/orders')
        })
    }


    return (
        <>
            <Head>
                <title>Orders | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isCancel && (
                <Modal>
                    <QuestionMarkCircleIcon className='h-[120px] text-red-400 mt-5'/>
                    <h1 className='text-center text-[23px] font-medium'>Are you sure want to cancel your orders ?</h1>
                    <div className='flex items-center space-x-3 mt-10'>
                        <button className='btn bg-gray-500 hover:bg-gray-600' onClick={() => setIsCancel(null)}>Cancel</button>
                        <button className='btn bg-red-400 hover:bg-red-500' onClick={() => cancelledOrders(isCancel)}>Cancel Orders</button>
                    </div>
                </Modal>
            )}
            {isSuccess && (
                <Modal>
                    <CheckCircleIcon className='h-[120px] text-green-400'/>
                    <h1 className="text-center text-gray-700 text-xl font-semibold mt-2">ORDER WAS CANCELLED</h1>
                    <div className="grid place-items-center">
                        <button className='btn bg-gray-500 hover:bg-gray-600 mt-5 w-max' onClick={() => setIsSuccess(false)}>Close</button>
                    </div>
                </Modal>
            )}
            <section className="my-6">
                {data.length > 0 && <h1 className="text-center text-blue-400 text-2xl font-medium mb-5 underline">My Orders</h1>}
                <div className='flex flex-col space-y-10'>
                   {data.length > 0 ? data.map(order => (
                        <div className='bg-white shadow-md rounded p-5 flex flex-col' key={order._id}>
                            <h1 className='mb-3'>Order Id: 
                                <span className='font-medium bg-blue-50 rounded-full p-2 leading-10'>   {order.order_id}
                                </span>
                            </h1>
                            <h1 className='mb-3'>Order on: 
                                <span className='font-medium'> {moment(order.createdAt).format('ll')}</span>
                            </h1>
                            <h1 className='mb-3'>Total Price :
                                <span className="text-green-600 font-medium text-lg">${order.data.totalPrice}</span></h1>
                            <div className="flex flex-col space-y-10">
                                {order?.data?.dataOrders.map(data => (
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
                                ))}
                            </div>
                            {order.status === 'pending' || order.status === 'in-progress' ? (
                                <>
                                    <div className='text-white flex items-center space-x-3 w-max bg-red-500 rounded-md cursor-pointer py-[8px] px-[10px] hover:bg-red-600 transition duration-300 mt-7' onClick={() => setIsCancel(order._id)}>
                                        <XCircleIcon className='h-7'/>
                                        <p className='font-medium'>Cancelled Orders</p>
                                    </div>
                                    <p className='mt-3 text-[16px] text-gray-500'>
                                        You can cancelled orders if status orders is {' '}
                                        <span className='text-yellow-600 font-semibold underline'>PENDING </span>
                                        or {' '}
                                        <span className='text-yellow-600 font-semibold underline'>IN PROGRESS</span>
                                    </p>
                                </>
                            ) : (
                                order.status === 'cancelled' || order.status === 'delivered' ? (
                                    <div className="flex items-center space-x-4 mt-7">
                                        <p className={`font-medium bg-gray-50 shadow-md w-max py-[8px] px-[10px] transition duration-300 ${order.status}`}>
                                            {order.status[0].toUpperCase() + order.status.slice(1)}
                                        </p>
                                        <button className='btn bg-red-500 hover:bg-red-600 w-max flex items-center' onClick={() => removeOrder(order._id)}>
                                            <TrashIcon className='h-5 mr-2'/>
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <p className={`font-medium bg-gray-50 shadow-md w-max py-[8px] px-[10px] transition duration-300 text-gray-700 animate-bounce mt-7`}>
                                        Relax, this products will arrived :)
                                    </p>
                                )
                            )}
                        </div>
                   )) : <NoData title='No Orders'/>}
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    const data = await fetchAPI('orders')

    if(!session?.user || session?.user?.email === 'admin@admin.com') {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    const dataUser = data.data.filter(order => order.email === session?.user?.email)
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return {
        props: {
            data: dataUser
        }
    }
}

export default Orders
