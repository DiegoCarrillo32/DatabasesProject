import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
export const Sidebar = () => {
  return (
    <aside className='dashboard-aside'>
        <Link className='link' to={'/dashboard/main'}>Perfil</Link>
        <Link className='link' to={'/dashboard/users'}>Usuarios</Link>
        <Link className='link' to={'/dashboard/assets'}>Activos</Link>
        <Link className='link' to={'/dashboard/loans'}>Préstamos</Link>
        <Link className='link' to={'/dashboard/areas'}>Areas</Link>
        <Link className='link' to={'/dashboard/locations'}>Ubicaciones</Link>
        <Link className='close link' to={'/login'}>Cerrar sesion</Link>
    </aside>
  )
}
