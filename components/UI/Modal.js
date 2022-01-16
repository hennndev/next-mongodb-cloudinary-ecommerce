import React from 'react'

const Modal = ({children, info}) => {
    return (
        <div className='fixed w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center z-30 bg-overlay px-[15px]'>
            <div className={`bg-gray-50 w-[400px] min-h-[150px] ${info && 'max-h-[600px] overflow-y-scroll'} z-50 rounded p-5 flex flex-col`}>
                {children}
            </div>
        </div>
    )
}

export default Modal
