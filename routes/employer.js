const express = require('express');
const router = express.Router();
const {employerAuth, adminAuth, adminAccess} = require('../middleware/auth');

const employerController = require('../controllers/employer');

router.get('/', employerAuth, employerController.getEmployers);
router.post('/signup', employerController.employerSignup);
router.post('/login', employerController.employerLogin);
router.delete('/', adminAuth, adminAccess('superAdmin', 'admin'), employerController.deleteEmployer);





module.exports = router;