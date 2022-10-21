const express = require('express')
const router = express.Router()
const {doSignUp,getUserData,doLogin,postApplicationSubmit}=require('../controllers/userController')

router.post('/signup',doSignUp)
router.post('/login',doLogin);
router.get('/user-auth-data',getUserData)
router.post('/application-submit',postApplicationSubmit)

module.exports = router;