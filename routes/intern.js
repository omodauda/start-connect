const express = require('express');
const router = express.Router();
const {internAuth, adminAuth, adminAccess} = require('../middleware/auth');

const internController = require('../controllers/intern');


router.post('/signup', internController.internSignUp);
router.post('/login', internController.internlogin);
router.patch('/updateProfile', internAuth, internController.internUpdate);
router.delete('/', adminAuth, adminAccess('superAdmin', 'admin'), internController.deleteIntern);


module.exports = router;