const express = require('express');
const router = express.Router();

const marketplace = require('../controllers/marketplace');

router.get('/', marketplace.getAll);


module.exports = router;