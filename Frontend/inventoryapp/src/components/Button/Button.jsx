import React from 'react'
import './Button.css'
export const Button = ({herarchy, title, type, onClick}) => {
  return (
    <button className={ `button-${herarchy}` } type={type} onClick={onClick ? onClick : null} >{title}</button>
  )
}
