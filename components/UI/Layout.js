import React from 'react'
import Header from './Header'
import Cart from '../Cart/Cart'
import { useData } from 'context/context'

const Layout = ({children}) => {

    const { openCart } = useData()

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header/>
            {openCart && <Cart/>}
            <div className="container py-[10px] px-[15px] md:px-[30px] relative">
                {children}
            </div>
        </div>
    )
}

export default Layout
