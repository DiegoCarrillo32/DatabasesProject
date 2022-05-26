import React from 'react'

export const DashboardProfile = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"))
  return (
    <h1>Hola {user_info.name}</h1>
  )
}
