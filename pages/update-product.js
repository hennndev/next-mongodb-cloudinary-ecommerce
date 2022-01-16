import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import Router from 'next/router'
import { useFormik } from 'formik'
import { useData } from 'context/context'
import { getSession } from 'next-auth/react'
import SuccessModal from '@/components/UI/SuccessModal'
import RequestModal from '@/components/UI/RequestModal'
import ProductForm from '@/components/Products/ProductForm'
import { ArrowCircleLeftIcon } from '@heroicons/react/outline'

const UpdateProduct = () => {

    
    const [isUpdate, setIsUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const { dataEdit, setDataEdit } = useData()
    

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            status: '',
            description: '',
            image: null
        },
        onSubmit: () => {
            setIsUpdate(true)
        }, 
        validationSchema: Yup.object({
            name: Yup.string('').required('Product name is required'),
            price: Yup.number().required('Product price is required').min(1, 'Minimum price is more than 0'),
            status: Yup.string().required('Product status is required'),
            description: Yup.string().required('Product description is required'),
            image: Yup.mixed().required('Product image is required!')
                        .test('fileSize', 'Maximum size image is < 1MB', value => typeof value === 'string' ? value.length > 0 : value?.size <= 1000000)
                        
        })
    })

    const uploadData = async() => {
        setIsUpdate(false)
        setIsLoading(true)
        
        const newProduct = {
            createdAt: dataEdit?.createdAt,
            name: formik?.values.name,
            price: formik?.values.price,
            status: formik?.values.status,
            description: formik?.values.description
        }

        if(typeof formik.values.image === 'string') {
            fetch(`/api/products/${dataEdit?._id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newProduct,
                    image: {
                        imageURL: dataEdit?.image.imageURL,
                        imageId: dataEdit?.image.imageId
                    },
                    checkImg: typeof formik.values.image === 'string'
                })
            }).then((res) => res.json()).then(() => {
                setIsLoading(false)
                formik.resetForm()
                setPreviewImage(null)
                setIsSuccess(true)
            })
        } else {
            const formDataImage = new FormData()
            formDataImage.append('file', formik?.values.image)
            formDataImage.append('upload_preset', 'qzxb5iq7')

            fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                method: 'POST',
                body: formDataImage
            }).then((res) => res.json()).then((res) => {
                fetch(`/api/products/${dataEdit?._id}`, {
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
                        checkImg: typeof formik.values.image === 'string',
                        oldImageId: dataEdit?.image.imageId
                    })
                }).then((res) => res.json()).then(() => {
                    setIsLoading(false)
                    formik.resetForm()
                    setPreviewImage(null)
                    setIsSuccess(true)
                })
            })
        }
        
    }

    useEffect(() => {
        if(dataEdit) {
            formik.setValues({
                ...formik.values,
                name: dataEdit?.name,
                price: dataEdit?.price,
                status: dataEdit?.status,
                description: dataEdit?.description,
                image: dataEdit?.image?.imageURL
            })
        } else Router.replace('/dashboard')
    }, [dataEdit])

    const handleCloseSuccessModal = () => {
        setIsSuccess(false)
        Router.replace('/dashboard')
        setDataEdit(null)
    }


    return (
        <>
            <Head>
                <title>Update Product | TheSneakers</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isUpdate && <RequestModal 
                    title='Are you sure want to update this product ?'
                    handleClose={() => setIsUpdate(false)}
                    handleConfirm={uploadData}
                    btnTitle='Update Product'/> }
            {isSuccess && (
                <SuccessModal title='Success Update Product'>
                    <button className='btn bg-gray-500 hover:bg-gray-600 mt-5 w-max' onClick={handleCloseSuccessModal}>Close</button>
                </SuccessModal>
            )}
            
            <section className='mt-10 mb-5'>
                <div className="flex-center">
                    <div className="mb-5 w-[800px]  cursor-pointer">
                        <div className='flex items-center space-x-3 text-gray-600 hover:text-gray-700 w-max' onClick={() => Router.replace('/dashboard')}>
                            <ArrowCircleLeftIcon className='h-6'/>
                            <p className='text-lg font-medium'>Back to dashboard</p>
                        </div>
                    </div>
                </div>
                <div className="flex-center">
                <ProductForm 
                    uploadForm
                    imageUpdateURL={dataEdit?.image?.imageURL}
                    titleForm="Update Product"
                    formik={formik} 
                    setPreviewImage={setPreviewImage} 
                    previewImage={previewImage} 
                    isLoading={isLoading}/>
                </div>
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

export default UpdateProduct
