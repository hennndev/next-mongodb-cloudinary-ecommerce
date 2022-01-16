import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { utilSort } from 'utils/utils'
import { useRouter} from 'next/router'
import { useData } from 'context/context'
import Modal from '@/components/UI/Modal'
import NoData from '@/components/UI/NoData'
import { getSession } from 'next-auth/react'
import SearchInput from '@/components/UI/SearchInput'
import RequestModal from '@/components/UI/RequestModal'
import SuccessModal from '@/components/UI/SuccessModal'
import Pagination from '@/components/Dashboard/Pagination'
import DashboardLinks from '@/components/UI/DashboardLinks'
import { SwitchVerticalIcon } from '@heroicons/react/outline'



const Dashboard = ({data}) => {

    const [isInfo, setIsInfo] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSort, setIsSort] = useState(false)
    const [dataSliced] = useState(5)
    const [page, setPage] = useState(1)
    const [dataSort, setDataSort] = useState('createdAt')

    const router = useRouter()
    const { setDataEdit } = useData()

    const handleEdit = (data) => {
        setDataEdit(data)
        router.push('/update-product')
    }
    const handleSort = (val) => {
        setIsSort(!isSort)
        setDataSort(val)
    }

    const deleteData = () => {
        fetch(`/api/products?productId=${isDelete?._id}&imageId=${isDelete?.image?.imageId}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then(() => {})
        router.replace(router.asPath)
        setIsDelete(false)
        setIsSuccess(true)
        setPage(1)
    }

    const formattedDataBySearch = data.data.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            String(product.price).toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            product.status.toLowerCase().includes(searchTerm.toLowerCase().trim())
    })



    return (
        <>
            <Head>
                <title>Dashboar Admin | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* INFO PRODUCT */}
            {isInfo && <Modal info>
                <h1 className='text-center font-semibold mb-2 text-lg underline text-gray-700-p0['>Product info</h1>
                <div className="flex items-center justify-center">
                    <div className='relative h-32 w-32'>
                        <Image src={isInfo?.image?.imageURL} layout='fill' objectFit='cover'/>
                    </div>
                </div>
                <p className='text-sm font-medium mb-2'>Name: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.name}</span>
                </p>
                <p className='text-sm font-medium mb-2'>Price: <br /> 
                    <span className='text-[16px] text-gray-700'>${isInfo?.price}</span>
                </p>
                <p className='text-sm font-medium mb-2'>Description: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.description}</span>
                </p>    
                <p className='text-sm font-medium mb-2'>Status: <br /> 
                    <span className='text-[16px] text-gray-700'>{isInfo?.status}</span>
                </p>    
                <button className='btn bg-gray-500 hover:bg-gray-600 mt-5' onClick={() => setIsInfo(false)}>Close</button>
            </Modal>}

            {isDelete && <RequestModal textClasses='text-red-500' btnTitle='Delete Product'     
                    classes='bg-red-500 hover:bg-red-600'
                    title='Are you sure want to delete this product ?'
                    handleClose={() => setIsDelete(false)}
                    handleConfirm={deleteData}/>}

            {isSuccess && (
                <SuccessModal title='Success Delete Product'>
                    <div className="grid place-items-center">
                        <button className='btn bg-gray-500 hover:bg-gray-600 mt-5 w-max' onClick={() => setIsSuccess(false)}>Close</button>
                    </div>
                </SuccessModal>
            )}

            <section className="my-10">
                <DashboardLinks/>
                <div className='my-5 flex'>
                    <SearchInput  searchTerm={searchTerm} 
                        placeholder="Type to search product (name, price, status)"
                        handleChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                {data.data.length > 0 ? (
                    <div className='w-full overflow-auto scrollbar-hide shadow-lg'>
                        <table className='w-full border-b border-gray-200'>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        No
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        Image
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500 relative group">
                                        Name
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('name')}/>
                                    </th>
                                    <th className="px-10 py-2 text-xs text-gray-500 relative group">
                                        Price
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('price')}/>
                                    </th>
                                    <th className="px-10 py-2 text-xs text-gray-500 relative group">
                                        Status
                                        <SwitchVerticalIcon className='h-4 absolute right-2 bottom-2 hidden group-hover:block cursor-pointer' onClick={() => handleSort('status')}/>
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        Info
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        Edit
                                    </th>
                                    <th className="px-3 py-2 text-xs text-gray-500">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {utilSort(formattedDataBySearch, isSort, dataSort)
                                .slice((page - 1) * dataSliced, (dataSliced * page)).map((data, idx) => (
                                    <tr className="whitespace-nowrap" key={data._id}>
                                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                                            {idx + 1 + (dataSliced * (page - 1))}        
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 flex-center">
                                            <div className='relative h-[60px] w-[60px]'>
                                                <Image src={data?.image?.imageURL} layout='fill' objectFit='contain'/>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-center w-[200px]">
                                            <p className="text-sm text-gray-900 whitespace-pre-wrap w-[200px]">
                                                {data?.name}
                                            </p>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <div className="text-sm text-green-400 font-medium">
                                                ${data?.price}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <div className={`text-sm ${data?.status === 'available' ? 'text-blue-700' : 'text-red-500'}  font-medium`}>
                                                {data?.status}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                                            <button className="btn px-4 py-1 text-sm w-max bg-gray-400 hover:bg-gray-500" onClick={() => setIsInfo(data)}>
                                                Info
                                            </button>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <button className="btn px-4 py-1 text-sm w-max bg-blue-400 hover:bg-blue-500" onClick={() => handleEdit(data)}>Edit</button>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <button className="btn px-4 py-1 text-sm w-max bg-red-400 hover:bg-red-500" onClick={() => setIsDelete(data)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <NoData title='Products Still Empty'/>}
            </section>
            {formattedDataBySearch.length > 5 && <Pagination 
                                page={page} 
                                setPage={setPage} 
                                dataLength={(dataSliced * page) >= (formattedDataBySearch.length)}/>}
        </>
    )
}







export const getServerSideProps =  async(ctx) => {
    const res = await fetch('http://localhost:3000/api/products')
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

export default Dashboard
