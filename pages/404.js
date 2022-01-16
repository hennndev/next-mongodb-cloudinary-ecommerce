import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Router from 'next/router'

const ErrorPage = () => {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex-center flex-col'>
                <div className="relative h-[400px] w-[300px]">
                    <Image src='/images/error-page.jpg' layout='fill' objectFit='contain'/>
                </div>
                <h1 className='text-2xl font-medium text-gray-600'>Oops, Page Not Found !</h1>
                <button className='btn mt-5 w-max' onClick={() => Router.push('/')}>Back to Store</button>
            </div>
        </>
    )
}

export default ErrorPage
