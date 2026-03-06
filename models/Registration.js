// models/Registration.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  regId:     { type: String, required: true, unique: true },
  eventId:   { type: String, required: true },
  eventName: { type: String },
  name:      { type: String, required: true },
  email:     { type: String, required: true, lowercase: true },
  phone:     { type: String, required: true },
  college:   { type: String, default: '' },
  regAt:     { type: Date, default: Date.now },
}, { timestamps: true });

schema.index({ eventId: 1, email: 1 }, { unique: true });
module.exports = mongoose.models.Registration || mongoose.model('Registration', schema);
