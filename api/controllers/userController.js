const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.doSignUp = asyncHandler(async (req, res, next) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await UserModel.create(user)
        res.status(201).json({
            status: 'User Created'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})
module.exports.doLogin = asyncHandler(async (req, res, next) => {
    try {
        const maxAge = 60 * 60 * 24;
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email })

        if (user) {
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (passwordCheck) {

                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
                res.cookie("jwt", token, {
                    withCrdentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                })
                // cookies.set('LastVisit', new Date().toISOString(), { signed: true })
                res.status(201).json({ userId: user._id, user: user, token, status: true })
            } else {
                res.status(400).json("Invalid Password")
            }
        } else {
            res.status(400).json("Invalid Email ")
        }
    } catch (error) {
        throw Error(error)
    }
});

module.exports.getUserData = asyncHandler(async (req, res, next) => {
    try {
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.TOKEN_KEY)
        const userID = jwtToken.userId
        const user = await UserModel.findOne({ _id: userID })
        res.status(201).json(user)
    } catch (error) {
        throw Error(error)
    }
})

module.exports.postApplicationSubmit = asyncHandler(async (req, res, next) => {
    try {
        const formData = req.body
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.TOKEN_KEY)
        const userID = jwtToken.userId

        await UserModel.updateOne({ _id: userID }, {
            $set: {
                'application.fullName': formData.fullName,
                'application.address': formData.address,
                'application.city': formData.city,
                'application.state': formData.state,
                'application.email': formData.email,
                'application.phone': formData.phone,
                'application.company': formData.company,
                'application.team': formData.team,
                'application.companyDetails': formData.companyDetails,
                status: 'Pending'
            }
        })
        res.status(201).json({
            status: 'Application Updated'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})