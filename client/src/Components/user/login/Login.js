import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import '../signup/Signup'
import axios from 'axios';
import { UserAuthContext } from '../../../Context/UserContext';


function Login() {
    const { user, setUser } = useContext(UserAuthContext)
    const [cookies, setCookie] = useCookies(['jwt']);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const { email, password } = formData

    useEffect(() => {
        if (cookies.jwt) {
            navigate('/')
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
            axios.post('http://localhost:5000/login', formData, { withCredentials: true }).then((data) => {
                
                if (data.data.status === true) {
                    setUser({
                        ...user,
                        id: data.data.userId,
                        name: data.data.user.name,
                        status: true,
                        form: data.data.user.application ? true : false,
                        formStatus: data.data.user.status ? data.data.user.status : null,
                        slotNo : data.data.user.slotNo ? data.data.user.slotNo : null
                    })
                    navigate('/')
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
                            <h2 className='head'>Login</h2>
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
                                    <Form.Group>
                                        <Form.Label onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Dont have account?</Form.Label>
                                    </Form.Group>
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
