import React, { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputControl from '@/components/UI/InputControl'
import SuccessModal from '@/components/UI/SuccessModal'

const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(null)

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }, 
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const req = await fetch('/api/auth/register', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        email: values.email,
                        password: values.password
                    })
                })
                const res = await req.json()
                if(res.message.includes('Error')) {
                    throw new Error(res.message.slice(7))
                } else {
                    setIsLoading(false)
                    setIsError(null)
                    setIsSuccess(true)
                }
            } catch (error) {
                setIsLoading(false)
                setIsError(error.message)
            }
            
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email('Email not valid'),
            password: Yup.string().required('Password is required').min(8, 'Minimum password length is 8 character or more'),
            passwordConfirmation: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Password Confirmation not match with password').required('Password Confirmation is required')
        })
    })

    const handleCloseSucces = () => {
        setIsSuccess(false)
        formik.resetForm()
    }
    

    return (
        <>
            <Head>
                <title>Register | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isSuccess && (
                <SuccessModal title='Success Register User' auth>
                    <button className='btn bg-gray-500 hover:bg-gray-600 w-max' onClick={handleCloseSucces}>Not Yet</button>
                    <button className='btn w-max' onClick={() => Router.push('/login')}>Login Now</button>
                </SuccessModal>
            )}
            <section className='flex-center my-10'>
                <form className='shadow-md bg-white w-[500px] rounded px-3 py-6' onSubmit={formik.handleSubmit}>
                    {isLoading && (
                        <div className='form-loading'></div>
                    )}
                    <h1 className='mb-3 text-2xl text-center text-blue-600 font-semibold'>Register</h1>
                   
                    <InputControl 
                        id='username'
                        title='Username'
                        formik={formik}
                        auth/>
                    <InputControl 
                        type='email'
                        id='email'
                        title='Email'
                        formik={formik}
                        auth/>
                    <InputControl 
                        type='password'
                        id='password'
                        title='Password'
                        formik={formik}
                        auth/>
                    <InputControl 
                        type='password'
                        id='passwordConfirmation'
                        title='Password Confirmation'
                        formik={formik}
                        auth/>
                    <button className={`btn mt-5 ${isLoading && 'btn-loading'}`} disabled={isLoading} type='submit'>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                    {isError && <h1 className='text-error font-medium mt-3'>{isError}</h1>}
                    <p className='text-center mt-4 text-gray-500'>
                        Already have an account ? {' '}
                        <span className='text-blue-500 underline cursor-pointer' onClick={() => Router.push('/login')}>Login</span>
                    </p>
                </form>
            </section>
        </>
    )
}

export default Register
