import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
export const NotFound = () => {
  return (
    <div className='not-container'>
      <h1>PAGINA NO ENCONTRADA...</h1>
      <h3>Talves quieras <Link to={'/login'}>Iniciar sesion</Link> ?</h3>
    </div>
  )
}
