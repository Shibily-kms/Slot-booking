import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/user/HomePage'
import SignupPage from '../Pages/user/SignupPage'
import LoginPage from '../Pages/user/LoginPage'
import EventRegisterPage from '../Pages/user/EventRegisterPage'
import { UserAuthContext, UserContext } from '../Context/UserContext'
import axios from 'axios';

function User() {
    const {user,setUser} = useContext(UserAuthContext)
    // console.log(cont,'hh');
    console.log('userEffect Top');
    useEffect(() => {
        console.log('useEffect Inner Start');
        axios.get('http://localhost:5000/user-auth-data', { withCredentials: true }).then((userData) => {
            console.log(userData.data, 'user');
            if(userData.data){
                setUser({
                    ...user,
                    id:userData.data._id,
                    name:userData.data.name,
                    status:true,
                    form: userData.data.application ? true : false,
                    formStatus:userData.data.status ? userData.data.status : null
                })
            }else{
                setUser({
                    ...user,
                    id:null,
                    name:null,
                    status:false,
                    form: false,
                    formStatus:null
                })
            }
        })
    },[])


    return (
        <div>
            <Routes>
                <Route element={<HomePage />} path='/' />
                <Route element={<SignupPage />} path='/signup' />
                <Route element={<LoginPage />} path='/login' />
                <Route element={<EventRegisterPage />} path='/event-register' />
            </Routes>
        </div>
    )
}

export default User
