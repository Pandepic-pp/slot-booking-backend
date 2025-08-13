const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;