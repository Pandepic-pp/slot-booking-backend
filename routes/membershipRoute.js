const express = require('express');
const {getMemberships, addMembership, updateMembership} = require('../controllers/membershipController');

const router = express.Router();

router.post('/get-memberships', getMemberships);
router.post('/add-memberships', addMembership);
router.patch('/memberships', updateMembership)

module.exports = router;