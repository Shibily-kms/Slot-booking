const express = require('express')
const router = express.Router()

const { doLogin, adminDetails, getAllUser, editUserData, deleteUser, getNewApplications,
    changeApplicationStatus, rejectedApplicationStatus } = require('../controllers/adminController')

router.post('/login', doLogin);
router.get('/admin-details', adminDetails);
router.get('/user-list', getAllUser);
router.post('/edit-user', editUserData);
router.post('/delete-user', deleteUser);
router.get('/applications/new', getNewApplications);
router.post('/applications/new/change-status',changeApplicationStatus)
router.get('/applications/rejected',rejectedApplicationStatus)

module.exports = router