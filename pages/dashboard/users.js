import React, { useState } from 'react'
import Head from 'next/head'
import NoData from '@/components/UI/NoData'
import { getSession } from 'next-auth/react'
import moment from 'moment'
import { SwitchVerticalIcon } from '@heroicons/react/outline'
import SearchInput from '@/components/UI/SearchInput'
import Pagination from '@/components/Dashboard/Pagination'
import DashboardLinks from '@/components/UI/DashboardLinks'



const Orders = ({data}) => {


    const [searchTerm, setSearchTerm] = useState('')   
    const [isSort, setIsSort] = useState(false)
    const [dataSliced] = useState(10)
    const [page, setPage] = useState(1)
    const [dataSort, setDataSort] = useState('createdAt')
    
    const handleSort = (val) => {
        setIsSort(!isSort)
        setDataSort(val)
    }

    const formattedDataBySearch = data.data.filter(user => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            moment(user.createdAt).format('LLL').toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    })
    

    return (
        <>
            <Head>
                <title>Dashboard Admin Users | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="my-10">
                <DashboardLinks/>
                <div className='my-5 flex'>
                    <SearchInput 
                        searchTerm={searchTerm} 
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type to search orders by (order_id, name, status)"/>
                </div>
                {data.data.length > 0 ? (
                    <div className='w-full overflow-auto scrollbar-hide'>
                        <table className='w-full border-b border-gray-200 shadow-lg'>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        No
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500 relative group">
                                        Date
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('createdAt')}/>
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500 relative group">
                                        Name
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('username')}/>
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500 relative group">
                                        Email
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('email')}/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {formattedDataBySearch.sort((a,b) => {
                                    if(!isSort) {
                                        if(dataSort === 'createdAt') {
                                            return new Date(b[dataSort]) - new Date(a[dataSort])
                                        } else {
                                            return b[dataSort].localeCompare(a[dataSort])
                                        }
                                    } else {
                                        if(dataSort === 'createdAt') {
                                            return new Date(a[dataSort]) - new Date(b[dataSort])
                                        } else {
                                            return a[dataSort].localeCompare(b[dataSort])
                                        }
                                    }
                                }).map((data, idx) => (
                                    <tr className="whitespace-nowrap" key={data._id}>
                                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                                            {idx + 1 + (dataSliced * (page - 1))}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 flex items-center justify-center">
                                            {moment(data.createdAt).format('LLL')}
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <div className="text-sm text-gray-900">
                                                {data.username}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <div className='text-sm font-semibold'>
                                                {data.email}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <NoData title='No Users'/>}
            </section>

            {formattedDataBySearch.length > 10 && <Pagination 
                                page={page} 
                                setPage={setPage} 
                                dataLength={(dataSliced * page) >= (formattedDataBySearch.length)}/>}
        </>
    )
}



export const getServerSideProps =  async(ctx) => {
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()

    const session = await getSession(ctx)

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
