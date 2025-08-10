const express = require('express');
const { addCustomer, getCustomers } = require('../controllers/customerController');

const router = express.Router();

router.post('/get-customers', getCustomers);
router.post('/customers', addCustomer);

module.exports = router;
