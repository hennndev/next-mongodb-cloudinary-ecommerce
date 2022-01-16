import React from 'react'
import Image from 'next/image'
import InputControl from '@/components/UI/InputControl'


const ProductForm = ({formik, setPreviewImage, previewImage, isLoading, titleForm, uploadForm, imageUpdateURL = null}) => {
 

    const handleChangeImg = (e) => {
        const { files } = e.target
        formik.setValues({
            ...formik.values,
            image: files[0]
        })
        if(files[0]?.size < 1000000) {
            handlePreviewImage(files[0])
        } else {
            setPreviewImage(null)
        }
    }

    const handlePreviewImage = (image) => {
        const readerImg = new FileReader()
        readerImg.readAsDataURL(image)
        readerImg.onloadend = () => {
            setPreviewImage(readerImg.result)
        }
    }

    return (     
        <form className='shadow-md p-5 rounded w-[800px] bg-white relative' onSubmit={formik.handleSubmit}>
            {isLoading && <div className='form-loading'></div> }
            <h1 className='text-center text-xl text-blue-600 font-semibold mb-4'>{titleForm}</h1>
            <InputControl
                id='name'
                title='Product Name'
                formik={formik}/>
            <InputControl
                type='number'
                id='price'
                title='Product Price'
                formik={formik}/>
            { uploadForm && <InputControl
                select
                id='status'
                title='Product Status'
                formik={formik}>
                    <option value="">Select Product Status</option>
                    <option value="soldout">Sold out</option>
                    <option value="available">Available</option>      
            </InputControl> }
            <InputControl
                id='description'
                title='Product Description'
                formik={formik}
                textarea/>    
            <div className='input-control'>
                <label htmlFor="" className='mb-2 text-gray-600 font-medium'>Product Image</label>
                <input 
                    type="file" 
                    className='form-input' 
                    accept='image/*'
                    onChange={handleChangeImg}/>
                {formik.touched.image && formik.errors.image && (
                    <small className='text-error'>{formik.errors.image}</small>
                )}
                {previewImage && (
                    <div className='relative h-[100px] w-[100px] mt-2'>
                        <Image src={previewImage} layout='fill' objectFit='cover'/>
                    </div>
                )}
                {uploadForm && imageUpdateURL && !previewImage && (
                    <div className='relative h-[100px] w-[100px] mt-2'>
                        <Image src={imageUpdateURL} layout='fill' objectFit='cover'/>
                    </div>
                )}
            </div>
            <button className={`btn ${isLoading && 'btn-loading'}`} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    )
}


export default ProductForm
