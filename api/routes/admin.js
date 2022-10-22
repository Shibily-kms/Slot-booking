const express = require('express')
const router = express.Router()

const {doLogin,adminDetails} = require('../controllers/adminController')

router.post('/login',doLogin);
router.get('/admin-details',adminDetails)

module.exports = router