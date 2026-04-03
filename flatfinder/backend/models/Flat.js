const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true
    },
    streetName: {
      type: String,
      required: true,
      trim: true
    },
    streetNumber: {
      type: Number,
      required: true,
      min: 1
    },
    areaSize: {
      type: Number,
      required: true,
      min: 1
    },
    hasAC: {
      type: Boolean,
      required: true,
      default: false
    },
    yearBuilt: {
      type: Number,
      required: true,
      min: 1000
    },
    rentPrice: {
      type: Number,
      required: true,
      min: 1
    },
    dateAvailable: {
      type: Date,
      required: true
    },
    ownerId: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    ownerEmail: {
      type: String,
      required: true
    },
    favouriteBy: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Flat', flatSchema);