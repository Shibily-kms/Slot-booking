const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const collection = require('../config/collection');
const ObjectId = require('mongodb').ObjectId;


module.exports.doSignUp = asyncHandler(async (req, res, next) => {
    try {
        console.log('1');
        const userDetails = req.body
        console.log(userDetails, '2');
        const salt = await bcrypt.genSalt(10);
        console.log('3');
        userDetails.password = await bcrypt.hash(userDetails.password, salt);
        console.log('4');
        db.get().collection(collection.USER_COLLECTION).findOne({ email: userDetails.email }).then((user) => {
            console.log(user, '5');
            if (user) {
                console.log('6');
                res.status(400).json({ errMessage: "Email Already Used" })
            } else {
                console.log('7');
                db.get().collection(collection.USER_COLLECTION).insertOne(userDetails).then((result) => {
                    console.log(result, '8');
                    res.status(201).json({
                        status: 'User Created'
                    })
                })

            }
        })
        console.log('8');
    } catch (error) {
        console.log(error)
        console.log('error user');
        next(error)
    }
})
module.exports.doLogin = asyncHandler(async (req, res, next) => {
    try {
        const maxAge = 60 * 60 * 24;
        const { email, password } = req.body;

        const user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: email })

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
        console.log('hiiiiiicheck');
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.TOKEN_KEY)
        if(jwtToken){
            console.log('hi');
            const userID = jwtToken.userId
            console.log(userID,'id');
            const user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userID) })
            res.status(201).json(user)
        }else{
            console.log('errrorrrrr');
        }
        console.log('errrorrrrraaaaaaaaaa');
    } catch (error) {
        res.status(400).json({errMessage:'User Not Login'})
        // throw Error(error)
    }
})

module.exports.postApplicationSubmit = asyncHandler(async (req, res, next) => {
    try {
        const formData = req.body
        const jwtToken = jwt.verify(req.cookies.jwt, process.env.TOKEN_KEY)
        const userID = jwtToken.userId

        await db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userID) }, {
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
});

