import React from 'react'
import { useRouter } from 'next/router'

const DashboardLinks = () => {

    const router = useRouter()
    const handleRoute = (route) => {
        if(!route) router.push(`/dashboard`)
        else router.push(`/dashboard/${route}`)
    }
    
    return (
        <div className="flex items-center space-x-3 mb-10">
            <p className='text-blue-500 underline cursor-pointer' onClick={() => handleRoute('')}>Products</p>
            <p className='text-blue-500 underline cursor-pointer' onClick={() => handleRoute('orders')}>Orders</p>
            <p className='text-blue-500 underline cursor-pointer' onClick={() => handleRoute('users')}>Users</p>
        </div>
    )
}

export default DashboardLinks
