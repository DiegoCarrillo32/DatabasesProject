import React from 'react'
import './Input.css'
export const Input = ({label, type, onChange}) => {
  return (
      <> 
        <label>{label}</label>
        <input className="textfield" type={type} onChange={onChange} ></input>
      </>
  )
}
