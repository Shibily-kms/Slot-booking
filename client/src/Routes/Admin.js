import React, { useContext,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../Pages/admin/AdminLogin'
import AdminHome from '../Pages/admin/AdminHome'
import { AdminAuthContext } from '../Context/AdminContext'
import axios from 'axios';

// Componentes
import UserListPage from '../Pages/admin/UserList'
import EditUserPage from '../Pages/admin/EditUser'
import NewApplications from '../Pages/admin/NewApplication'
import ViewApplications from  '../Pages/admin/ViewApplication'
import Rejected from '../Pages/admin/RejectedApplication'
import Approved from '../Pages/admin/ApprovedApplications'
import Slot from '../Pages/admin/Slot'

function Admin() {
  const { admin, setAdmin } = useContext(AdminAuthContext)
  useEffect(() => {
    axios.get('http://localhost:5000/admin/admin-details', { withCredentials: true }).then((adminData) => {
      console.log(adminData,'adminDatga');
      if (adminData.data) {
        setAdmin({
          ...admin,
          id: adminData.data.id,
          name: adminData.data.userName,
          status: true,
          email: adminData.data.email
        })
      } else {
        setAdmin({
          ...admin,
          id: null,
          name: null,
          status: false,
          email: false
         
        })
      }
    })
  }, [])
  return (
    <div>
      <Routes>
        <Route element={<AdminHome />} path='/' />
        <Route element={<AdminLogin />} path='/login' />
        <Route element={<UserListPage />} path='/user-list' />
        <Route element={<EditUserPage />} path='/edit-user' />
        <Route element={<Slot />} path='/slot' />
        <Route element={<NewApplications />} path='/application' />
        <Route element={<NewApplications />} path='/application/new' />
        <Route element={<ViewApplications />} path='/application/new/view' />
        <Route element={<Rejected />} path='/application/rejected' />
        <Route element={<Approved />} path='/application/approved' />

      </Routes>
    </div>
  )
}

export default Admin