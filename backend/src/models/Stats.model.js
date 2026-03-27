const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  workHours: { type: Number, default: 253440 },
  coffeeCups: { type: Number, default: 73370 },
  projects: { type: Number, default: 307 },
  yearsExperience: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
