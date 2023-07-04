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
      assignment: [
        {
            day1am: {
                type: String,
            },
            day1pm: {
                type: String,
            },
            day2am: {
                type: String,
            },
            day2pm: {
                type: String,
            },
            day3am: {
                type: String,
            },
            day3pm: {
                type: String,
            },
        },
    ],
});

module.exports = mongoose.model('profile', ProfileSchema);