const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    notes: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
});

module.exports = mongoose.model('profile', ProfileSchema);
