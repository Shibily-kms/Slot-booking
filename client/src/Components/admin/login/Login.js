import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './login.css'
import axios from 'axios';
import { AdminAuthContext } from '../../../Context/AdminContext'

function Login() {
    const { admin, setAdmin } = useContext(AdminAuthContext)

    const [cookies, setCookie] = useCookies(['jwtAdmin']);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const { email, password } = formData

    useEffect(() => {
        if (cookies.jwtAdmin) {
            navigate('/admin/')
        }
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (formData.email === '' || password === '') {
            setError('Fill form complete')
        } else {
            axios.post('http://localhost:5000/admin/login', formData, { withCredentials: true }).then((data) => {
        
                if (data.data.status === true) {
                   
                    setAdmin({
                        ...admin,
                        id: data.data.id,
                        name: data.data.userName,
                        status: true,
                        email: data.data.email
                    })
                    navigate('/admin')
                } else {
                    setError("Somting Error! Try now")
                }
            }).catch((error) => {
              
                setError(error.response.data)
            })
        }

    }

    return (
        <React.Fragment>
            <div className="mainDiv">
                <div className='container'>
                    <div className='row  boxDiv '>
                        <div className='col-12 col-sm-7 col-md-5 borderDiv'>
                            <h2 className='head'>Admin Login</h2>
                            <div className=''>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} value={email} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={password} />
                                    </Form.Group>
                                    {error && <p className='error-form'>{error}</p>}

                                    <button className='btn btn-primary w-100 fw-bold'>SignIn</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
