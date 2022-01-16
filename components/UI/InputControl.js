import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const InputControl = ({type = 'text', formik, id, title, children, auth, textarea = null, select = null, phoneNumber}) => {

    let inputType = <input 
                        id={id}
                        type={type} 
                        className='form-input' 
                        placeholder={`Type ${auth ? 'your' : ''} ${title.toLowerCase()}`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>
    if(textarea) {
        inputType = <textarea 
                        rows={6} 
                        className='form-input' 
                        placeholder={`Type ${title.toLowerCase()}`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>        
    }
    if(select) {
        inputType = <select
                        id={id}
                        className='form-input' 
                        placeholder={`Type ${auth ? 'your' : ''} ${title.toLowerCase()}`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}>
                            {children}
                        </select>
    }

    return (
        <div className='input-control'>
            <label htmlFor={id} className='mb-2 text-gray-600 font-medium'>{title}</label>
            {phoneNumber && <PhoneInput
                country={'id'}
                id={id}
                inputProps={{
                    className: 'form-input'
                }}
                inputStyle={{  
                    width: '100%',
                    paddingLeft: '50px'
                }}
               value={formik.values[id]}
               onChange={phone => formik.setValues({...formik.values, phoneNumber: phone})}
            onBlur={formik.handleBlur}
            />}
            {!phoneNumber && inputType}
            {formik.touched[id] && formik.errors[id] && (
                <small className='text-error'>{formik.errors[id]}</small>
            )}
        </div>
    )
}

export default InputControl
