const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


module.exports.doLogin = asyncHandler(async (req, res, next) => {
    let admin = {
        id: 121,
        userName: 'Admin DArt',
        email: 'admin@gmail.com',
        password: '123456'
    }
    const maxAge = 60 * 60 * 24;
    const { email, password } = req.body;
    if (email === admin.email) {
        if (password === admin.password) {
            const token = jwt.sign({ adminId: admin.id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
            res.cookie("jwtAdmin", token, {
                withCrdentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            })
            admin.status=true
            res.status(201).json(admin)
        } else {
            res.status(400).json('Invalid Password')
        }

    } else {
        res.status(400).json('Invalid Email Address')
    }
})

module.exports.adminDetails = asyncHandler(async(req,res,next)=>{
    try {
        let admin = {
            id: 121,
            userName: 'Admin DArt',
            email: 'admin@gmail.com',
            password: '123456'
        }
        const jwtToken = jwt.verify(req.cookies.jwtAdmin, process.env.TOKEN_KEY)
        const adminId = jwtToken.adminId
       if(adminId){
           res.status(201).json(admin)
       }
    } catch (error) {
        throw Error(error)
    }
})