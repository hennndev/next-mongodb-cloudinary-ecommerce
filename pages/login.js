import React, { useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, getSession } from 'next-auth/react'
import InputControl from '@/components/UI/InputControl'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, 
        onSubmit: async (values) => {
            setIsLoading(true)
            const status = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });
            if(status.error) {
                setIsLoading(false)
                setIsError(status.error)
            } else {
                setIsLoading(false)
                setIsError(null)
                router.replace('/')
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email not valid'),
            password: Yup.string().required('Password is required').min(8, 'Minimum password length is 8 character or more')
        })
    })

    
    return (
        <>
            <Head>
                <title>Login | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className='flex-center my-10'>
                <form className='shadow-md bg-white w-[500px] rounded px-3 py-6' onSubmit={formik.handleSubmit}>
                    {isLoading && <div className='form-loading'></div>}
                    <h1 className='mb-3 text-2xl text-center text-blue-600 font-semibold'>Login</h1>
                    <InputControl
                        type='email'
                        id='email'
                        title='E-mail'
                        formik={formik}
                        auth/>
                    <InputControl
                        type='password'
                        id='password'
                        title='Password'
                        formik={formik}
                        auth/>
                    <div className='flex items-center space-x-2 mt-2'>
                        <input type="checkbox" />
                        <p className='text-gray-600 text-[15px] font-medium'>Remember Me</p>
                    </div>
                    <button className={`btn mt-5 ${isLoading && 'btn-loading'}`} disabled={isLoading} type='submit'>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                    {isError && <h1 className='text-error font-medium mt-3'>{isError}</h1>}
                    <p className='text-center mt-4 text-gray-500'>
                        Don't have an account ? {' '}
                        <span className='text-blue-500 underline cursor-pointer' onClick={() => router.push('/register')}>Register</span>
                    </p>
                </form>
            </section>
        </>
    )
}


export const getServerSideProps = async(ctx) => {
    const session = await getSession(ctx)

    if(session?.user?.email) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: {}
    }
}

export default Login
