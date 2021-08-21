const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true
    },
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    profilePic: {
      type: String,
      required: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: false
    },
    reputation: {
      type: Number,
      default: 0,
      required: false
    },
    isPaidMember: {
      type: Boolean,
      default: false,
      required: false
    },
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    company: {
      type: String,
      default: 'Freelancer',
      required: false
    },
    date: {
      type: Date,
      default: Date.now,
    }
  }
);

module.exports = mongoose.model('User', UserSchema);
