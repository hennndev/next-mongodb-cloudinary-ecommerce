import { createContext, useContext, useState } from 'react'

const Context = createContext()

const Provider = ({children}) => {
    const [cart, setCart] = useState([])
    const [openCart, setOpenCart] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const [dataCheckout, setDataCheckout] = useState(null)

    const addCart = (data) => {
        const existItem = cart.find(item => item._id === data._id) 
        if(existItem) {
           return; 
        }
        setCart(
            [...cart, {...data, size: data?.size || 36} ]  
        )
    }
    const deleteCart = (data) => {
        const filteredCart = cart.filter(item => item._id !== data._id)
        setCart(filteredCart)
    }
    const incCount = (data) => {
        let updateCart = [...cart]
        const item = cart.find(item => item._id === data._id)
        const itemIdx = cart.indexOf(item)
        
        item.count++
        updateCart[itemIdx] = item
        setCart(updateCart)
    }

    const deleteCount = (data) => {
        let updateCart = [...cart]
        const item = cart.find(item => item._id === data._id)
        const itemIdx = cart.indexOf(item)
        
        if(item.count === 1) {
            deleteCart(data)
        } else {
            item.count--
            updateCart[itemIdx] = item
            setCart(updateCart)
        }  
    }
    const handleSizeShoe = (id, val) => {
        const updateCartBySize = cart.map(item => {
            return {
                ...item,
                size: item._id === id ? +val : item?.size || 36
            }
        })
        setCart(updateCartBySize)
    }    
    const handleClear = () => setCart([])

    return (
        <Context.Provider value={{
            cart, 
            openCart, 
            dataEdit,
            dataCheckout,
            setDataCheckout,
            setCart,
            setOpenCart,
            addCart,
            deleteCart,
            incCount,
            deleteCount,
            handleClear,
            setDataEdit,
            setDataCheckout,
            handleSizeShoe
        }}>
            {children}
        </Context.Provider>
    )
}

const useData = () => useContext(Context)


export {Provider, useData}