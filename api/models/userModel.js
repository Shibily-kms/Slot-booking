const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, 'Please provide mobile number']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    application: {
        fullName: {
            type: String,
            required: [true, 'Place Fill']
        },
        address: {
            type: String,
            required: [true, 'Place Fill']

        },
        city: {
            type: String,
            required: [true, 'Place Fill']

        },
        state: {
            type: String,
            required: [true, 'Place Fill']

        },
        email: {
            type: String,
            required: [true, 'Place Fill']

        },
        phone: {
            type: Number,
            required: [true, 'Place Fill']

        },
        company: {
            type: String,
            required: [true, 'Place Fill']

        },
        team: {
            type: String,
            required: [true, 'Place Fill']
        },
        companyDetails: {
            type: String,
            required: [true, 'Place Fill']
        }
    },
    status: {
        type: String,
        default: null
    }
},
    {
        timestamps: true
    })

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel