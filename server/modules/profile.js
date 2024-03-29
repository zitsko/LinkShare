const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  imageURL: {
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
  profileEmail: {
    type: String,
    required: true,
    unique: true, 
    // sparse: true,
  },
   userId: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
