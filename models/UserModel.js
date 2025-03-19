const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['Customer', 'FloorStaff', 'Cashier', 'Manager', 'Admin'], // Allowed user types
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  primaryOutletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outlet', // Reference to the outlets collection
  },
  authorizedOutlets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outlet', // Reference to the outlets collection
  }],
  permissions: {
    type: [String], // Array of specific system permissions
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
  lastLogin: {
    type: Date,
  },
});

// Middleware to update the `lastLogin` field before saving
userSchema.pre('save', function (next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = Date.now();
  }
  next();
});

// Create the Mongoose model
const User = mongoose.model('User', userSchema);

module.exports = User;