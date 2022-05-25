import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import './Dashboard.css'
export const Dashboard = () => {
  const [toggle, setToggle] = useState(false)
  return (
    //Acá lo que tiene que hacer que <Sidebar> por defecto no se renderice, y luego
    //usando un UseState binario renderizar <Sidebar> when #toggler is checked.
    //El UseState va a variar entre true o false (o 0/1) según corresponda.
    <div className='dashboard-container'>
      <nav className='navbar'>
        <div className='aside'>
          <input type="checkbox" name="" id="toggler" onChange={()=>{setToggle(!toggle)}}/>
        </div>
        {
          toggle ? <Sidebar className='sidebar' id='sidebar'></Sidebar> : null
        }
      </nav>

      
      <main className='dashboard-outlet'>
        <Outlet/>
      </main>
      
    </div>
  )
}
