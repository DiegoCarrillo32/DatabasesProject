import React from 'react'
import './Input.css'
export const Input = ({label, type, onChange, value}) => {
  console.log(value);
  return (
      <> 
        <label className='label'>{label}</label>
        <input className="textfield" type={type} onChange={onChange} value={value} ></input>
      </>
  )
}
