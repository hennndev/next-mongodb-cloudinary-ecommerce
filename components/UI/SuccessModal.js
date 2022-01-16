import React from 'react'
import Modal from './Modal'
import { CheckCircleIcon } from '@heroicons/react/outline'

const SuccessModal = ({children, title, auth}) => {
    return (
        <Modal>
            <CheckCircleIcon className='h-[120px] text-green-400'/>
            <h1 className="text-center text-gray-700 text-xl font-semibold mt-2">{title}</h1>
            {auth && <p className='text-center text-gray-700 mb-4'>Now You Can Login Account</p>}
            <div className="flex-center space-x-2 mt-2">
                {children}
            </div>
        </Modal>
    )
}

export default SuccessModal
