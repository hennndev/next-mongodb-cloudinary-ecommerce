import React from 'react'
import Modal from './Modal'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'

const RequestModal = ({handleClose, title, subtitle, btnTitle, classes = '', textClasses = '', handleConfirm = null}) => {
    return (
        <Modal>
            <QuestionMarkCircleIcon className={`h-[120px] text-blue-400 ${textClasses} mt-5`}/>
            <h1 className='text-center text-[23px] font-medium'>{title}</h1>
            {subtitle && <p className='text-center text-gray-500 font-medium'>(
                {subtitle}
            </p>}
            <div className='flex items-center space-x-3 mt-10'>
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleClose}>Cancel</button>
                {handleConfirm && <button className={`btn ${classes}`} onClick={handleConfirm}>{btnTitle}</button>}
            </div>
        </Modal>
    )
}

export default RequestModal
