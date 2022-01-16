import React from 'react'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline'

const Pagination = ({page, setPage, dataLength, home}) => {

    const handleBack = () => {
        if(page !== 1) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if(!dataLength) {
            setPage(page + 1)
        }
    }

    return (
        <div className={`flex-center space-x-5 text-blue-500 ${home && ' text-lg font-medium'} mb-10`}>
            <ArrowCircleLeftIcon className={`${home ? 'h-6' : 'h-5'} ${page <= 1 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleBack}/>
            <span>{page}</span>
            <ArrowCircleRightIcon className={`${home ? 'h-6' : 'h-5'} ${dataLength ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleNext}/>
        </div>
    )
}

export default Pagination
