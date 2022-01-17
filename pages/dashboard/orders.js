import React, { useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import Image from 'next/image'
import Router from 'next/router'
import Modal from '@/components/UI/Modal'
import NoData from '@/components/UI/NoData'
import { getSession } from 'next-auth/react'
import { utilSort, fetchAPI } from 'utils/utils'
import EditOrders from '@/components/Dashboard/EditOrders'
import { SwitchVerticalIcon } from '@heroicons/react/outline'
import SearchInput from '@/components/UI/SearchInput'
import Pagination from '@/components/Dashboard/Pagination'
import DashboardLinks from '@/components/UI/DashboardLinks'



const Orders = ({data}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isInfo, setIsInfo] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [dataSort, setDataSort] = useState('createdAt')
    const [dataSliced] = useState(7)
    const [page, setPage] = useState(1)
    const [isEdit, setIsEdit] = useState(null)
    
    const handleSort = (val) => {
        setIsSort(!isSort)
        setDataSort(val)
    }
    const formattedDataBySearch = data.data.filter(order => {
        return order.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            order.order_id.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            moment(order.createdAt).format('LLL').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            (order.status === 'pending' ? 'new' : order.status).toLowerCase().includes(searchTerm.toLowerCase().trim())
    })

    const deleteOrder = (id) => {
        fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then(() => {
            Router.replace('/dashboard/orders')
        })
    }



    return (
        <>
            <Head>
                <title>Dashboard Admin | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isInfo && <Modal info>
                <h1 className='text-center font-semibold mb-2 text-lg text-gray-700'>Order info</h1>
                <p className='text-sm font-medium mb-3'>Name: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.name}</span>
                </p>
                <p className='text-sm font-medium mb-3'>Phone Number: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.phoneNumber}</span>
                </p>
                <p className='text-sm font-medium mb-3'>Address: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.address}</span>
                </p>
                <p className='text-sm font-medium mb-3'>City: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.city}</span>
                </p>  
                <div>
                    <p className='text-sm font-medium mb-3'>Orders: </p>
                    <div className='flex flex-col ml-5 space-y-3'>
                        {isInfo?.data?.dataOrders.map(order => (
                            <div className='flex space-x-3' key={order._id}>
                                <div className="relative h- w-[50px] h-[50px]">
                                    <Image src={order.imageURL} layout='fill' objectFit='contain'/>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm mb-[2px]'>{order.name}</p>
                                    <p className='text-gray-600 text-sm'>qty ({order.count}x) size ({order.size})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>  
                <p className='text-sm font-medium mb-3'>Total Price: <br /> 
                    <span className='text-[16px] text-green-700'>${isInfo?.data.totalPrice}</span>
                </p>  
                <p className='text-sm font-medium mb-3'>Status: <br /> 
                    <span className={`text-[16px] ${isInfo.status}`}>{isInfo?.status}</span>
                </p>  
                <button className='btn bg-gray-500 hover:bg-gray-600 mt-5' 
                    onClick={() => setIsInfo(false)}>Close</button>
            </Modal>}

            {isEdit && <EditOrders handleClose={() => setIsEdit(null)} isEdit={isEdit}/>}

            <section className="my-10">
                <DashboardLinks/>
                <div className='my-5 flex'>
                    <SearchInput searchTerm={searchTerm} 
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type to search orders by (order_id, name, status)"/>
                </div>
                {data.data.length > 0 ? (
                    <div className='w-full overflow-auto scrollbar-hide'>
                        <table className='w-full border-b border-gray-200 shadow-lg'>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="th-table">
                                        No
                                    </th>
                                    <th className="th-table relative group">
                                        Date
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('createdAt')}/>
                                    </th>
                                    <th className="th-table">
                                        Order ID
                                    </th>
                                    <th className="th-table relative group">
                                        Name
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('name')}/>
                                    </th>
                                    <th className="th-table px-10 relative group">
                                        Status
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('status')}/>
                                    </th>
                                    <th className="th-table">
                                        Price
                                    </th>
                                    <th className="th-table">
                                        Edit
                                    </th>
                                    <th className="th-table">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-600">
                                {utilSort(formattedDataBySearch, isSort, dataSort)
                                .slice((page - 1) * dataSliced, (dataSliced * page)).map((data, idx) => (
                                    <tr className="whitespace-nowrap" key={data._id}>
                                        <td className="td-table text-center">
                                            {idx + 1 + (dataSliced * (page - 1))}
                                        </td>
                                        <td className="td-table text-center">
                                            {moment(data.createdAt).format('LLL')}
                                        </td>
                                        <td className="td-table text-center">
                                            {data.order_id}
                                        </td>
                                        <td className="td-table text-center">
                                            <div className="text-gray-900">
                                                {data.name}
                                            </div>
                                        </td>
                                        <td className="td-table text-center">
                                            <div className={`${data.status} font-semibold`}>
                                                {data.status === 'pending' ? 'New' : data.status}
                                            </div>
                                        </td>
                                        <td className="td-table text-center">
                                            <button className="btn px-4 py-1 w-max bg-gray-400 hover:bg-gray-500" onClick={() => setIsInfo(data)}>
                                                Info
                                            </button>
                                        </td>
                                        <td className="td-table text-center">
                                            <button className="btn px-4 py-1 w-max bg-blue-400 hover:bg-blue-500" onClick={() => setIsEdit(data)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className="td-table text-center">
                                            <button className={`btn px-4 py-1 w-max ${data.status !== 'cancelled' ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-500 cursor-pointer'}`} disabled={data.status !== 'cancelled'}
                                            onClick={() => deleteOrder(data._id)}>
                                                {data.status === 'cancelled' ? 'Delete' : 'Not Allowed'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <NoData title='Orders Still Empty'/>}
            </section>

            {formattedDataBySearch.length > 7 && <Pagination 
                                page={page} 
                                setPage={setPage} 
                                dataLength={(dataSliced * page) >= (formattedDataBySearch.length)}/>}
        </>
    )
}



export const getServerSideProps =  async(ctx) => {
    const session = await getSession(ctx)
    const data = await fetchAPI('orders')    
    
    if(session?.user?.email !== 'admin@admin.com') {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: {
            data
        }
    }
}

export default Orders
