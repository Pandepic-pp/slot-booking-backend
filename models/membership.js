const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  package_id: { type: Number, required: true},
  phone: { type: String, required: true },
  oversLeft: { type: Number, required: true }
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;