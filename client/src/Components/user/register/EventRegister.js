import React, { useContext } from 'react'
import { useState } from 'react';
import { UserAuthContext } from '../../../Context/UserContext';
import Form from 'react-bootstrap/Form';
import './eventRegister.css'
import axios from 'axios';
import Popup from '../pop/Popup'
function EventRegister() {
    const { user, setUser } = useContext(UserAuthContext)
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        company: '',
        team: '',
        companyDetails: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setError('')
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (formData.fullName == '' || formData.address == '' || formData.city == '' || formData.state == '' || formData.email == '' || formData.phone == '' || formData.company == '' || formData.team == '' || formData.companyDetails == '') {
            setError('Fill Form Complete')
        } else if (formData.phone.length < 10) {
            setError('Phone Number minimum 10 required')
        } else {
            console.log(formData);
            axios.post('http://localhost:5000/application-submit', formData, { withCredentials: true }).then((result) => {
                console.log('setUP ',result);
                if(result.data.status){
                    console.log('hi');
                    setUser({
                        ...user,
                        form : true,
                        formStatus : "Pending"

                    })
                }
            }).catch((error) => {

            })
        }

    }


    return (
        <React.Fragment>
            <div className="homeDiv text-dark">
                <div className='container'>
                    {error &&
                        <div className="alertUserFormData">
                            <p>{error}</p>
                        </div>}
                    <div className='row  boxDiv '>
                        {user.form ?
                           <Popup  action={user.formStatus} />
                            :
                            <div className='col-12 col-sm-7 col-md-6 borderDiv'>
                                <h2 className='head'>Enter Your Startup details</h2>
                                <div className=''>
                                    <Form className='' onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control onChange={handleChange} type="text" placeholder="Enter name" name='fullName' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control onChange={handleChange} type="text" placeholder="Enter address" name='address' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control onChange={handleChange} type="text" placeholder="Enter city" name='city' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control onChange={handleChange} type="text" placeholder="Enter state" name='state' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name='email' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control onChange={handleChange} type="number" placeholder="Enter mobile number" name='phone' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCompany">
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control onChange={handleChange} type="text" placeholder="Company Name" name='company' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicLogo">
                                            <Form.Label>Company Logo</Form.Label>
                                            <Form.Control onChange={handleChange} type="file" name='Company-Logo' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicTeam">
                                            <Form.Label>Describe your team and background</Form.Label>
                                            <Form.Control onChange={handleChange} as="textarea" name='team' />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicProducts">
                                            <Form.Label>Describe your comapany and products</Form.Label>
                                            <Form.Control onChange={handleChange} as="textarea" name='companyDetails' />
                                        </Form.Group>

                                        <button className='btn btn-primary w-100 fw-bold'>Submit</button>
                                    </Form>
                                </div>
                            </div>
                         }

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EventRegister
