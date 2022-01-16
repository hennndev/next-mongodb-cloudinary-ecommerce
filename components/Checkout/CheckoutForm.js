import React, { useState } from 'react'
import * as Yup from 'yup'
import Router from 'next/router'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import InputControl from '../UI/InputControl'
import SuccessModal from '../UI/SuccessModal'
import RequestModal from '../UI/RequestModal'



const CheckoutForm = ({totalPrice, dataOrders, handleReplaceDataToCart}) => {

    const [isCheckout, setIsCheckout] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { data: session } = useSession()
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            phoneNumber: '',
            city: '',
            paymentMethod: ''
        }, 
        onSubmit: () => {
            setIsCheckout(true)
        }, 
        validationSchema: Yup.object({
            name: Yup.string().required('Your name is required'),
            address: Yup.string().required('Your address must be complete'),
            phoneNumber: Yup.number().required('Your number is required')
                            .test('longNum', 'Minimum long number is 8 number or more', 
                            value => value?.toString().length >= 9),
            city: Yup.string().required('Your city is required'),
            paymentMethod: Yup.string().required('Your payment method is required')

        })
    })

    const uploadOrder = () => {
        const newOrder = {
            ...formik.values,
            email: session?.user?.email,
            data: {
                totalPrice,
                dataOrders: dataOrders.map(item => {
                    return {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        count: item.count,
                        size: item.size,
                        imageURL: item?.image?.imageURL
                    }
                })
            }
        }
        setIsLoading(true)
        fetch('/api/orders', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        }).then((res) => res.json()).then(() => {
            setIsCheckout(false)
            setIsLoading(false)
            formik.resetForm()
            setIsSuccess(true)
        })
    }
    const handleBackFromCheckout = () => {
        setIsSuccess(false)
        Router.push('/')
    }
    return (
        <>
            {isCheckout && (
                <RequestModal title='Order Now ?' btnTitle='Order Now!'  textClasses='text-yellow-600' handleConfirm={uploadOrder}
                    subtitle='After order you will be wait 2/3 days for processed your orders)'
                    handleClose={() => setIsCheckout(false)}         
                    classes='bg-yellow-600 hover:bg-yellow-700'/>
            )}
            {isSuccess && (
                <SuccessModal title='Success Order Products'>
                    <button className='btn bg-gray-500 hover:bg-gray-600 mt-5 w-max' onClick={handleBackFromCheckout}>Close</button>
                </SuccessModal>
            )}
            {isLoading && <div className='form-loading'></div>}
            <form onSubmit={formik.handleSubmit}>
                <h1 className='text-center text-xl font-medium text-blue-500 mb-3'>Payment Details</h1>
                <InputControl
                    id='name'
                    title='Name'
                    formik={formik}/>
                <InputControl
                    id='address'
                    title='Address'
                    formik={formik}/>
                <InputControl
                    id='phoneNumber'
                    title='Phone Number'
                    formik={formik}
                    phoneNumber/>
                <InputControl
                    id='city'
                    title='City'
                    formik={formik}/>
                <InputControl
                    select
                    id='paymentMethod'
                    title='Payment Method'
                    formik={formik}>
                    <option value="">Select payment method</option>
                    <option value="cod">COD</option>
                </InputControl>
                <button className={`btn mb-4 ${isLoading ? 'btn-loading' : 'bg-yellow-600 hover:bg-yellow-700'} font-semibold`} type='submit' disabled={isLoading}>
                    {isLoading ? 'Loading...' : `Pay $${totalPrice}`}
                </button>
                <button disabled={isLoading} type='button' 
                    className={`btn mb-4 ${isLoading && 'btn-loading'} font-semibold`} 
                    onClick={handleReplaceDataToCart} >
                    {isLoading ? 'Not Allowed' : 'Shopping again, replace this items to cart'}
                </button>
                <button disabled={isLoading} type='button'
                    className={`btn ${isLoading && 'btn-loading'} bg-gray-600 hover:bg-gray-700 font-semibold`} 
                    onClick={() => Router.push('/')} >
                    {isLoading ? 'Not Allowed' : 'Cancel'}
                </button>
            </form>
        </>
    )
}

export default CheckoutForm
