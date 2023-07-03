const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    notes: {
      type: String
    },
    date: {
    type: Date,
    default: Date.now},
      experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            }
        },
    ],
});

module.exports = mongoose.model('profile', ProfileSchema);