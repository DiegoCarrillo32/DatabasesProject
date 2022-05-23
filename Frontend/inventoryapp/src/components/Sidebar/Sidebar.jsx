import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
export const Sidebar = () => {
  return (
    <aside className='dashboard-aside'>
        <Link className='link' to={'/dashboard/profile'}>Perfil</Link>
        <Link className='link' to={'/dashboard/main'}>Dashboard</Link>
        <Link className='link' to={'/dashboard/main'}>Préstamos</Link>
        <Link className='link' to={'/dashboard/main'}>Activos</Link>
        <Link className='link' to={'/dashboard/main'}>Usuarios</Link>
        <Link className='close link' to={'/login'}>Cerrar sesion</Link>
    </aside>
  )
}
