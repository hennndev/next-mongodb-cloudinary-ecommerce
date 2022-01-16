import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useData } from 'context/context'
import SizeForm from '@/components/UI/SizeForm'

const ProductDetail = ({data}) => {

    const [valSize, setValSize] = useState('36')
    const router = useRouter()
    const { addCart } = useData()

    const handleAddCart = (item) => {
        addCart({...item, size: +valSize})
    }

    return (
        <>
            <Head>
                <title>Product Detail | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className='mt-10 mb-5 flex-center'>
                <div className='w-[800px] bg-white shadow-md flex flex-col md:flex-row space-x-3 rounded'>
                    <div className="relative h-[300px] w-full md:w-[300px]">
                        <Image src={data?.data?.image.imageURL} layout='fill' objectFit='cover' className='rounded-l'/>
                    </div>
                    <div className='p-3 text-gray-800 flex-1 flex justify-between flex-col '>
                        <div>
                            <h1 className='text-lg font-medium'>{data?.data?.name}</h1>
                            <p className='mt-2 text-gray-600 text-[15px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac tellus id lacus pellentesque faucibus. Nulla lacinia eget felis et eleifend. Duis sodales congue augue.</p>
                            <p className='text-lg text-green-600 font-semibold mt-2'>US${data?.data?.price}</p>
                            <div className="flex items-center space-x-3 mt-3">
                                <p>Size: </p>
                                <SizeForm item={data.data} valSize={valSize} handleChange={(e) => setValSize(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-5">
                            <button className="btn bg-gray-500 hover:bg-gray-600 shadow-lg" onClick={() => router.push('/')}>Get Back</button>
                            <button className="btn shadow-lg" onClick={() => handleAddCart(data.data)}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/products')
    const data = await res.json()

    const paths = data.data.map(product => ({
        params: { productId: product._id }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({params}) => {
    const res = await fetch(`http://localhost:3000/api/products/${params.productId}`)
    const data = await res.json()

    return {
        props: { data }
    }
}



export default ProductDetail
