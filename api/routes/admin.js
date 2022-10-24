const express = require('express')
const router = express.Router()

const { doLogin, adminDetails, getAllUser, editUserData, deleteUser, getNewApplications,
    changeApplicationStatus, rejectedApplicationStatus, approvedApplicationStatus, getAllSlots, chooseSlot
 } = require('../controllers/adminController')

router.post('/login', doLogin);
router.get('/admin-details', adminDetails);
router.get('/user-list', getAllUser);
router.post('/edit-user', editUserData);
router.post('/delete-user', deleteUser);
router.get('/applications/new', getNewApplications);
router.post('/applications/new/change-status',changeApplicationStatus)
router.get('/applications/rejected',rejectedApplicationStatus);
router.get('/applications/approved',approvedApplicationStatus);
router.get('/slot-list',getAllSlots);
router.post('/choose-slot',chooseSlot)


module.exports = router