// models/Event.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true },
  cat:           { type: String, required: true },
  name:          { type: String, required: true },
  college:       { type: String, required: true },
  date:          { type: String, required: true },
  time:          { type: String, default: '10:00 AM' },
  venue:         { type: String, required: true },
  prize:         { type: String, default: '₹0' },
  free:          { type: Boolean, default: false },
  hot:           { type: Boolean, default: false },
  tags:          [String],
  deadline:      { type: Date, required: true },
  registrations: { type: Number, default: 0 },
  description:   { type: String, default: '' },
  regLink:       { type: String, default: '' },
  verified:      { type: Boolean, default: false },
  submittedBy:   { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Event || mongoose.model('Event', schema);
