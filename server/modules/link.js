const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  platform: {
    type: String,
    // required: true,
    validate: {
      validator: function (value) {
        try {
           // Check if the platform name matches the hostname
          const platformMatchesHostname =
            (value.toLowerCase() === 'github' && value.includes('github')) ||
            (value.toLowerCase() === 'linkedin' && value.includes('linkedin'));

          return platformMatchesHostname;
        } catch (error) {
          // If the URL is invalid, don't proceed with validation
          return false;
        }
      },
      message: 'Invalid platform for the provided URL.',
    },
  },
  customPlatform: {
    type: String,
    // customPlatform is optional, so it doesn't need to be required.
    validate: {
      validator: function (value) {
        try {
          // If customPlatform is provided, validate it as a valid URL using the URL constructor
          if (value) {
            new URL(value);
          }
          return true;
        } catch (error) {
          // If the URL is invalid, don't proceed with validation
          return false;
        }
      },
      message: 'Invalid URL for custom platform.',
    },
  },
  url: {
    type: String,
    // required: true,
  },
  order: {
    type: Number,
  },
  userId: {
    type: String,
    // required: true,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
