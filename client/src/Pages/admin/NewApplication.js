import React from 'react'
import NewApplicationPage from '../../Components/admin/NewApplications/NewApplications'
import AdminHeader from '../../Components/admin/Header/HomeNavbar'
function NewApplication() {
  return (
    <div>
        <AdminHeader />
        <NewApplicationPage />
    </div>
  )
}

export default NewApplication