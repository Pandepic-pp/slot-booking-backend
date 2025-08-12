const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  package_id: { type: Number, required: true},
  oversLeft: { type: Number, required: true },
  validity: {type: Date, required: true },
  price: { type: Number, required: true },
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;