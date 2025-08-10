const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  package: { type: Number, default: null }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;