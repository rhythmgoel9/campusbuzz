// models/Submission.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:    { type: String, required: true },
  college: { type: String, required: true },
  date:    { type: String, required: true },
  cat:     { type: String, required: true },
  venue:   { type: String, required: true },
  prize:   { type: String, default: '' },
  desc:    { type: String, default: '' },
  link:    { type: String, default: '' },
  email:   { type: String, required: true, lowercase: true },
  size:    { type: String, default: 'Individual' },
  status:  { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.models.Submission || mongoose.model('Submission', schema);
