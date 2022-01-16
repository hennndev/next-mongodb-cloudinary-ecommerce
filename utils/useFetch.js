import React from 'react'

const useFetch = () => {
    const res = await fetch('/api/products')
    const data = await res.json()

    return data
}

export default useFetch
