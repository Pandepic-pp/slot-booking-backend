const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const bookingRouter = require('./routes/bookingsRoute');
const customerRouter = require('./routes/customerRoute');
const membershipRouter = require('./routes/membershipRoute');

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://slot-booking-iu1o.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// MongoDB connect
(async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('MongoDB URI is not defined in the .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
})();

// Routes
app.use('/api', bookingRouter);
app.use('/api', customerRouter);
app.use('/api', membershipRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});