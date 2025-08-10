const Customer = require('../models/customer');

async function addCustomer(req, res) {
  try {
    const { phone, name, package } = req.body;

    if (!phone || !name) {
      return res.status(400).json({ message: 'Phone and name are required' });
    }

    let customer = await Customer.findOne({ phone });
    if (customer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    customer = new Customer({
      phone,
      name
    });

    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding customer', error: err.message });
  }
}

async function getCustomers(req, res) {
  try {
    const {phone} = req.body;
    let customers;
    if(phone) customers = await Customer.find({phone: phone});
    else customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching customers', error: err.message });
  }
}

module.exports = { addCustomer, getCustomers };
