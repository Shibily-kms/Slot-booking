import React, { useContext,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../Pages/admin/AdminLogin'
import AdminHome from '../Pages/admin/AdminHome'
import { AdminAuthContext } from '../Context/AdminContext'
import axios from 'axios';
// Componentes

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
        {/* <Route element={<LoginPage />} path='/user-list' />
        <Route element={<LoginPage />} path='/edit-user' />
        <Route element={<LoginPage />} path='/applications' /> */}

      </Routes>
    </div>
  )
}

export default Admin