import React from 'react'
import AdminHeader from '../../Components/admin/Header/HomeNavbar'
import Rejected from '../../Components/admin/NewApplications/RejectedApplications'



function RejectedApplication() {
    return (
        <div>
            <AdminHeader />
            <Rejected />
        </div>
    )
}

export default RejectedApplication