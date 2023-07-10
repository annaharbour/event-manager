const Schema = require('mongoose').Schema;
const mongoose = require("mongoose");

const AssignmentSchema = new Schema({
  assignedTo: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    required: false,
    default: [],
  },
  maxAssignees: {
    type: Number,
    required: true,
    min: 0,
  },
  day: {
    type: String,
    enum: ['friday', 'saturday', 'sunday'],
    required: true,
  },
  ampm: {
    type: String,
    enum: ['am', 'pm'],
  },
  jobName: {
    type: String,
    required: true,
  }
});

module.exports =  mongoose.model('assignment', AssignmentSchema);
