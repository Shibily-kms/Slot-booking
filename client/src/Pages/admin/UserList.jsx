import React from 'react'
import AdminHeader from '../../Components/admin/Header/HomeNavbar'
import UserListPage from '../../Components/admin/userList/UserList'

function UserList() {
    return (
        <div>
            <AdminHeader />
            <UserListPage />
        </div>
    )
}

export default UserList