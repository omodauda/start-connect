const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admin');
const {adminAuth, adminAccess} = require('../middleware/auth');

router.post('/signup', adminAuth, adminAccess('superAdmin'), admincontroller.adminSignUp);
router.post('/login', admincontroller.adminlogin);



module.exports = router;