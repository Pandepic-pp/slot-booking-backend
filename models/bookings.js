const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  bookedBy: { type: String, required: true },
  customerType: { type: String, required: true },
  bookingType: { type: String, required: true },
  packageId: {type: Number, required: true},
  center: { type: Number, required: true },
  onDate: { type: Date, required: true },
  onTime: { type: String, required: true },
  forDate: { type: Date, required: true },
  forTime: { type: String, required: true },
  price: { type: Number, required: true },
  overs: { type: Number, required: true },
  status: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
