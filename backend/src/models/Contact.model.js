const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  service: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['new', 'in_progress', 'done', 'rejected'], default: 'new' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
