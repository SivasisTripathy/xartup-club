const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    pic: {
      type: String,
      required: false
    },
    reputation: {
      type: Number,
      required: false,
      default: 0
    },
    googleId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  }
);

module.exports = mongoose.model('Company', CompanySchema);