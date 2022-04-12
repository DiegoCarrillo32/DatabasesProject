import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import './Dashboard.css'
export const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <Sidebar/>
      <main className='dashboard-outlet'>
        <Outlet/>
      </main>
      
    </div>
  )
}
