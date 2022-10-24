const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const collection = require('../config/collection');
const ObjectId = require('mongodb').ObjectId;


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
            admin.status = true
            res.status(201).json(admin)
        } else {
            res.status(400).json('Invalid Password')
        }

    } else {
        res.status(400).json('Invalid Email Address')
    }
})

module.exports.adminDetails = asyncHandler(async (req, res, next) => {
    try {
        let admin = {
            id: 121,
            userName: 'Admin DArt',
            email: 'admin@gmail.com',
            password: '123456'
        }
        const jwtToken = jwt.verify(req.cookies.jwtAdmin, process.env.TOKEN_KEY)
        const adminId = jwtToken.adminId
        if (adminId) {
            res.status(201).json(admin)
        }
    } catch (error) {
        throw Error(error)
    }
})

module.exports.getAllUser = asyncHandler(async (req, res, next) => {
    try {
        await db.get().collection(collection.USER_COLLECTION).find().toArray().then((userList) => {

            if (userList) {
                res.status(201).json(userList)
            } else {
                res.status(201).json({ noResult: true })
            }
        }).catch((error) => {
           
            throw Error(error)
        })
    } catch (error) {
        throw Error(error)
    }
})

module.exports.editUserData = asyncHandler(async (req, res, next) => {
    try {
        let data = req.body
       
        await db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(data.id) }, {
            $set: {
                name: data.name,
                mobile: data.mobile
            }
        }).then((result) => {
            if (result) {
                res.status(201).json({
                    status: 'User details Updated'
                })
            }
        }).catch((error) => {
            res.status(400).json("Updated Faild ")
        })
    } catch (error) {
        throw Error(error)
    }
})

module.exports.deleteUser = asyncHandler(async (req, res, next) => {
    let data = req.body
   
    await db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: ObjectId(data.id) }).then((result) => {
        if (result) {
            res.status(201).json({
                status: 'User Deleted'
            })
        }
    }).catch((error) => {
        throw Error(error)
    })

})

module.exports.getNewApplications = asyncHandler(async (req, res, next) => {
    try {
        await db.get().collection(collection.USER_COLLECTION).find({ status: "Pending" }).toArray().then((data) => {
            res.status(201).json(data)
        })
    } catch (error) {
        throw Error(error)
    }
});

module.exports.changeApplicationStatus = asyncHandler(async (req, res, next) => {
    try {
     
        let data = req.body
        await db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(data.id) }, {
            $set: {
                status: data.status
            }
        }).then(() => {
            res.status(201).json({ status: "Status Changed" })
        })

    } catch (error) {
        throw Error(error)
    }
});

module.exports.rejectedApplicationStatus = asyncHandler(async (req, res, next) => {
    try {

        await db.get().collection(collection.USER_COLLECTION).find({ status: "Rejected" }).toArray().then((data) => {
        
            res.status(201).json(data)
        })
    } catch (error) {
        throw Error(error)
    }
});

module.exports.approvedApplicationStatus = asyncHandler(async (req, res, next) => {
    try {
        await db.get().collection(collection.USER_COLLECTION).find({ status: "Approved" }).toArray().then((data) => {
            res.status(201).json(data)
        })
    } catch (error) {
        throw Error(error)
    }
});

module.exports.getAllSlots = asyncHandler(async (req, res, next) => {
    try {
        await db.get().collection(collection.SLOT_COLLECTION).find().toArray().then((slots) => {
            res.status(201).json(slots)
        })
    } catch (error) {
        throw Error(error)
    }
});

module.exports.chooseSlot = asyncHandler(async (req, res, next) => {
    try {
        let body = req.body
        await db.get().collection(collection.SLOT_COLLECTION).updateOne({ slotId: body.slotId }, {
            $set: {
                userId: body.userId,
                company: body.company,
                status: true
            }
        }).then((result) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(body.userId) }, {
                $set: {
                    slotNo: body.slotId
                }
            }).then(() => {
                res.status(201).json({ status: 'Slot Booked' })
            })
        })
     
    } catch (error) {
        next(error)
    }
})

