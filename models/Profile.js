const mongoose = require('mongoose');
const { DATE } = require('sequelize');
const Schema = require('mongoose').Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    company: {
        type: String
      },
      location: {
        type: String
      },
      status: {
        type: String,
        required: true
      },
      skills: {
        type: [String],
        required: true
      },
      bio: {
        type: String
      },
      social: {
        facebook: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      },
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
    education : [
      {
        school: {
          type: String
        },
        degree: {
          type: String
        },
        fieldofstudy: {
          type: String
        },
        from: {
          type: Date
        },
        to: {
          type: Date
        },
        current: {
          type: String
        },
        description: {
          type: String
        }
      }
    ]
});

module.exports = mongoose.model('profile', ProfileSchema);