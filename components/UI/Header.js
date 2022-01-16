import React, { useState } from 'react'
import Modal from './Modal'
import NavHeader from './NavHeader'
import { useData } from 'context/context'
import { signOut } from 'next-auth/react'
import { ShoppingBagIcon, MenuIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'

const Header = () => {

    const [openNav, setOpenNav] = useState(false)  
    const [isLogout, setIsLogout] = useState(false)
    const { cart, setOpenCart } = useData()
    
    const handleClose = () => setOpenNav(false)
    const handleCloseLogout = () => setIsLogout(false)

    const handleLogout = () => setIsLogout(true)
    const logoutUser = () => {
        handleCloseLogout()
        signOut()
    }


    return (
        <div className='py-3 px-[15px] md:px-[30px] bg-white'>
            {isLogout && (
                <Modal>
                    <QuestionMarkCircleIcon className='h-[120px] text-red-400 mt-5'/>
                    <h1 className='text-center text-[23px] font-medium'>Logout User ?</h1>
                    <div className='flex items-center space-x-3 mt-10'>
                        <button className='btn bg-gray-500 hover:bg-gray-600' onClick={() => setIsLogout(false)}>Cancel</button>
                        <button className='btn bg-red-500 hover:bg-red-600' onClick={logoutUser}>Logout Now</button>
                    </div>
                </Modal>
            )}
            <div className="container flex flex-col">
                <div className="flex-between">
                    <h1 className='text-2xl font-bold text-blue-600'>TheSneakers</h1>
                    
                    <NavHeader 
                        classes='hidden md:flex items-center space-x-5 mt-[5px]'
                        handleClose={handleClose} 
                        setOpenCart={setOpenCart} 
                        handleLogout={handleLogout}
                        cart={cart}/>

                    <div className="flex md:hidden items-center space-x-4 mt-1">
                        <div onClick={() => setOpenCart(true)} className='cursor-pointer'>
                            <ShoppingBagIcon className='h-5 text-gray-500'/> 
                            {cart.length > 0 && (
                                <div className='bg-red-400 rounded-full absolute h-[18px] w-[18px] flex items-center justify-center text-center text-[10px] text-white -mt-2 -ml-2'>
                                    {cart.length}
                                </div>
                            )}
                        </div>
                        <MenuIcon className='h-5  cursor-pointer text-gray-500' onClick={() => setOpenNav(!openNav)}/>   
                    </div>
                </div>
                
                <NavHeader
                    classes={`${openNav ? 'flex md:hidden' : 'hidden'} md:hidden flex-col space-y-4 mt-[10px]`}
                    mobile
                    handleClose={handleClose} 
                    setOpenCart={setOpenCart} 
                    handleLogout={handleLogout}
                    cart={cart}/>
            </div>
        </div>
    )
}

export default Header
