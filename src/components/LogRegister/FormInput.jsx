import React from 'react'

const FormInput = ({ icon, placeholder }) => {
  return (
    <div className='input-form'>
        <label className='input-icon'>{icon}</label>
        <input type="text" placeholder={placeholder} className='form-input-text' />
    </div>
  )
}

export default FormInput