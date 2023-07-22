// models/profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    
  profilePhoto: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //unique for profile
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
