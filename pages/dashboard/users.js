import React, { useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import NoData from '@/components/UI/NoData'
import { getSession } from 'next-auth/react'
import { utilSort, fetchAPI } from 'utils/utils'
import SearchInput from '@/components/UI/SearchInput'
import Pagination from '@/components/Dashboard/Pagination'
import DashboardLinks from '@/components/UI/DashboardLinks'
import { SwitchVerticalIcon } from '@heroicons/react/outline'



const Orders = ({data}) => {

    const [searchTerm, setSearchTerm] = useState('')   
    const [isSort, setIsSort] = useState(false)
    const [dataSliced] = useState(5)
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
                <title>Dashboard Admin | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="my-10">
                <DashboardLinks/>
                <div className='my-5 flex'>
                    <SearchInput searchTerm={searchTerm}
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Type to search users by (username, email, createdAt)"/>
                </div>
                {data && data.data.length > 0 ? (
                    <div className='w-full overflow-auto scrollbar-hide'>
                        <table className='w-full border-b border-gray-200 shadow-lg'>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="th-table">
                                        No
                                    </th>
                                    <th className="th-table relative group">
                                        Created At
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('createdAt')}/>
                                    </th>
                                    <th className="th-table relative group">
                                        Username
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('username')}/>
                                    </th>
                                    <th className="th-table relative group">
                                        Email
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('email')}/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-700">
                                {utilSort(formattedDataBySearch, isSort, dataSort)
                                .slice((page - 1) * dataSliced, (dataSliced * page)).map((data, idx) => (
                                    <tr className="whitespace-nowrap" key={data._id}>
                                        <td className="td-table text-gray-500 text-center">
                                            {idx + 1 + (dataSliced * (page - 1))}
                                        </td>
                                        <td className="td-table text-gray-500 flex items-center justify-center">
                                            {moment(data.createdAt).format('LLL')}
                                        </td>
                                        <td className="td-table text-center">
                                            <div className="text-gray-800 font-semibold">
                                                {data.username}
                                            </div>
                                        </td>
                                        <td className="td-table text-center">
                                            <div className='font-semibold'>
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

            {formattedDataBySearch.length > 5 && <Pagination 
                                page={page} 
                                setPage={setPage} 
                                dataLength={(dataSliced * page) >= (formattedDataBySearch.length)}/>}
        </>
    )
}



export const getServerSideProps =  async(ctx) => {
    const session = await getSession(ctx)
    const data = await fetchAPI('users')
    
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
