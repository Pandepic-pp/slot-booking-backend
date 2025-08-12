const Booking = require('../models/bookings');
const { centers } = require('../config/data');
const { generateTimeSlots, getNext7Days } = require('../helper');
const data = require('../config/data');
const Membership = require('../models/membership');
const Customer = require('../models/customer');
const { packages } = require('../config/data');

async function getBookingCount(centerId, date, slot) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await Booking.countDocuments({
    center: centerId.toString(),
    forDate: { $gte: startOfDay, $lte: endOfDay },
    forTime: slot
  });
}

async function getAvailableSlots(req, res) {
  try {
    const centerId = parseInt(req.query.centerId);
    const center = centers.find(c => c.id === centerId);

    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }

    const slots = generateTimeSlots();
    const dates = getNext7Days();
    const result = {};

    // Prepare all booking count promises in advance
    const queries = [];
    for (const date of dates) {
      for (const slot of slots) {
        queries.push({
          date,
          slot,
          promise: getBookingCount(centerId, date, slot)
        });
      }
    }

    // Run all DB queries in parallel
    const counts = await Promise.all(queries.map(q => q.promise));

    // Build final result using counts
    let idx = 0;
    for (const date of dates) {
      result[date] = [];
      for (const slot of slots) {
        const bookingCount = counts[idx++];
        const available = bookingCount < center.lanes;
        result[date].push({
          slot,
          status: available ? 'available' : 'unavailable'
        });
      }
    }

    res.json({
      centerId: center.id,
      centerName: center.name,
      availability: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addBooking(req, res) {
  try {
    const bookingDataArray = Array.isArray(req.body) ? req.body : [req.body];
    const savedBookings = [];
    let isPackageSaved = false;

    for (const bookingData of bookingDataArray) {
      const {
        bookedBy,customerType,bookingType,packageId,center,onDate,onTime,forDate,forTime,status
      } = bookingData;

      const lastBooking = await Booking.findOne().sort({ id: -1 });
      const id = lastBooking ? lastBooking.id + 1 : 1;
      let price = 500, overs = 10; 

      if(bookingType === 'Package Buy' && isPackageSaved === false) {
        const p = packages.find((pack) => pack.id === packageId);
        const validity = new Date();
        validity.setMonth(validity.getMonth() + p.validity);
        const newMembership = new Membership({
          phone: bookedBy, package_id: packageId, validity, oversLeft: p.package, price: p.price
        });
        await newMembership.save();
        isPackageSaved = true;
      }

      const newBooking = new Booking({
        id, bookedBy,customerType,bookingType,packageId,center,onDate,onTime,forDate,forTime,price, overs,status
      });

      const savedBooking = await newBooking.save();
      savedBookings.push(savedBooking);
    }

    res.status(201).json(savedBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding booking', error: err.message });
  }
}

async function getBooking(req, res) {
  try {
    const query = {};

    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
}

async function updateBooking(req, res) {
  try {
    const { _id, action } = req.body;
    if (!_id || !action) {
      return res.status(400).json({ message: "Missing _id or action in request body" });
    }

    let newStatus, aTime = null, exTime = null, updatedBooking;

    if (action === 'active') {
      newStatus = 'active';
      aTime = new Date();
      exTime = new Date(aTime.getTime() + 15 * 60 * 1000); // 15 mins later
      updatedBooking = await Booking.findByIdAndUpdate(
        _id,
        { 
          status: newStatus,
          activationTime: aTime,
          expiryTime: exTime
        },
        { new: true }
      );
      return res.json({ message: `Booking ${action}d successfully`, booking: updatedBooking });
    } 
    
    if (action === 'cancel') {
      newStatus = 'cancelled';
    } else if (action === 'completed') {
      newStatus = 'completed';
    } else {
      return res.status(400).json({ message: "Invalid action. Must be 'active' or 'cancel' or 'complete'." });
    }

    updatedBooking = await Booking.findByIdAndUpdate(
      _id,
      { 
        status: newStatus
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: `Booking ${action}d successfully`, booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { updateBooking, addBooking, getBooking, getAvailableSlots };