import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Table from 'react-bootstrap/Table';


function ViewApplications() {
    const location = useLocation()
    
    let data = location.state
   
    return (
        <div>
            <div className="container">
                <h3 className='text-center mt-2 text-primary'>View Application</h3>
                <div>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>Full name</td>
                                <td>{data.application.fullName}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{data.application.address}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{data.application.city}</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>{data.application.state}</td>
                            </tr>
                            <tr>
                                <td>Company</td>
                                <td>{data.application.company}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{data.application.email}</td>
                            </tr>
                            <tr>
                                <td>Mobile / Phone</td>
                                <td>{data.application.phone}</td>
                            </tr>
                            <tr>
                                <td>Your team and background</td>
                                <td>{data.application.team}</td>
                            </tr>
                            <tr>
                                <td>Your comapany and products</td>
                                <td>{data.application.companyDetails}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ViewApplications