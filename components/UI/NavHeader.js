import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ShoppingBagIcon } from '@heroicons/react/outline'

const NavHeader = ({classes, mobile, handleClose, cart, setOpenCart, handleLogout}) => {
    
    const router = useRouter()
    const { data: session } = useSession()

    const handleLink = (route) => {
        handleClose()
        router.push(route)
    }

    return (
        <nav className={classes}>
            <p className='link cursor-pointer' onClick={() => handleLink('/')}>Store</p>
            <p className='link cursor-pointer' onClick={() => handleLink('/about')}>About</p>
            {session?.user && session?.user?.email !== "admin@admin.com" && (
                <p className='link cursor-pointer' onClick={() => handleLink('/orders')}>My Orders</p>
            )}
            {session?.user?.email === "admin@admin.com" && (
                <>
                    <p className='link cursor-pointer' onClick={() => handleLink('/add-product')}>
                        Add Product
                    </p>
                    <p className='link cursor-pointer' onClick={() => handleLink('/dashboard')}>
                        Dashboard
                    </p>
                </>
            )}
            {session?.user?.email ? (
                <p className='link text-red-500 hover:text-red-600 cursor-pointer' onClick={handleLogout}>Logout</p>
            ): (
                <p className='link cursor-pointer' onClick={() => handleLink('/login')}>Login</p>
            )}
            {!mobile && (
                <div onClick={() => setOpenCart(true)} className='cursor-pointer'>
                    <ShoppingBagIcon className='h-5 text-gray-500'/> 
                    {cart.length > 0 && (
                        <div className='bg-red-400 rounded-full absolute h-[18px] w-[18px] flex items-center justify-center text-center text-[10px] text-white -mt-2 -ml-2'>
                            {cart.length}
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default NavHeader
