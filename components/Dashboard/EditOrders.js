import React, { useState } from 'react'
import Modal from '../UI/Modal'
import Router from 'next/router'

const EditOrders = ({handleClose, isEdit}) => {

    const [valStatus, setValStatus] = useState(isEdit.status)
    const handleConfirm = () => {
        fetch(`/api/orders/${isEdit._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newStatus: valStatus})
        }).then(res => res.json()).then(() => {
            handleClose()
            Router.replace('/dashboard/orders')
        })
    }


    return (
        <Modal>
            <h1 className='mb-3 text-center text-lg text-gray-700 font-medium'>Edit Status Orders</h1>
            <select className='form-input border border-gray-400' value={valStatus} onChange={(e) => setValStatus(e.target.value)}>
                <option value="pending">New</option>
                <option value="in-progress">In Progress</option>
                <option value="awaiting-payment">Awaiting Payment</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
                <option value="delivered">Delivered</option>
            </select>
            <div className="flex items-center space-x-3 mt-4">
                <button className='btn bg-gray-500 hover:bg-gray-600' onClick={handleClose}>
                    Close
                </button>
                <button className='btn' onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </Modal>
    )
}

export default EditOrders
