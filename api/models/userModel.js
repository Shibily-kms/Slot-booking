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
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        company: {
            type: String,
        },
        team: {
            type: String, 
        },
        companyDetails: {
            type: String,
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