import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
export const Sidebar = () => {
  return (
    <aside className='dashboard-aside'>
        <Link to={'/dashboard/profile'}>Perfil</Link>
        <Link to={'/dashboard/main'}>Tablero</Link>
        <Link className='close' to={'/login'}>Cerrar sesion</Link>
    </aside>
  )
}
