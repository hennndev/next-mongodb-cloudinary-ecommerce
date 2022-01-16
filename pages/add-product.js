import React, { useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { getSession } from 'next-auth/react'
import SuccessModal from '@/components/UI/SuccessModal'
import RequestModal from '@/components/UI/RequestModal'
import ProductForm from '@/components/Products/ProductForm'


const AddProduct = () => {

    const [isAdd, setIsAdd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            image: null
        },
        onSubmit: () => {
            setIsAdd(true)
        }, 
        validationSchema: Yup.object({
            name: Yup.string('').required('Product name is required'),
            price: Yup.number().required('Product price is required').min(1, 'Minimum price is more than 0'),
            description: Yup.string().required('Product description is required'),
            image: Yup.mixed().required('Product image is required!')
                        .test('fileSize', 'Maximum size image is < 1MB', value => value?.size <= 1000000)
                        
        })
    })

    const uploadData = async() => {
        setIsAdd(false)
        setIsLoading(true)
        const formDataImage = new FormData()
        formDataImage.append('file', formik?.values.image)
        formDataImage.append('upload_preset', 'qzxb5iq7')

        const newProduct = {
            name: formik?.values.name,
            price: formik?.values.price,
            description: formik?.values.description
        }
        
        fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
            method: 'POST',
            body: formDataImage
        }).then((res) => res.json()).then((res) => {
            fetch('/api/products', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newProduct,
                    image: {
                        imageURL: res.url,
                        imageId: res.public_id
                    },
                })
            }).then((res) => res.json()).then(() => {
                setIsLoading(false)
                setPreviewImage(null)
                formik.resetForm()
                setIsSuccess(true)
            })

        })
    }

    return (
        <>
            <Head>
                <title>Add Product | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isAdd && (
                <RequestModal 
                    title='Are you sure want to add new product ?'
                    handleClose={() => setIsAdd(false)}
                    handleConfirm={uploadData}
                    btnTitle='Add Product'/>
            )}
            {isSuccess && (
                <SuccessModal title='Success Upload New Product'>
                    <button className='btn bg-gray-500 hover:bg-gray-600 mt-5 w-max' onClick={() => setIsSuccess(false)}>Close</button>
                </SuccessModal>
            )}
            <section className='mt-10 mb-5 flex-center'>
                <ProductForm 
                    titleForm="Add Product"
                    formik={formik} 
                    setPreviewImage={setPreviewImage} 
                    previewImage={previewImage} 
                    isLoading={isLoading}/>
            </section>
        </>
    )
}



export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if(session?.user?.email !== 'admin@admin.com') {
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

export default AddProduct
