const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobs');
const {employerAuth, employerAccess} = require('../middleware/auth');

router.post('/', employerAuth, employerAccess('employer'), jobController.postJob);




module.exports = router;