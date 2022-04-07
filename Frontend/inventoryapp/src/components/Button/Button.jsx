import React from 'react'
import './Button.css'
export const Button = ({herarchy, title, type}) => {
  return (
    <button className={ `button-${herarchy}` } type={type} >{title}</button>
  )
}
