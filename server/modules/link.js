const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        try {
          // Parse and validate the URL
          const urlObject = new URL(this.url);

          // Extract the hostname (domain name) from the URL
          const hostname = urlObject.hostname.toLowerCase();

          // Check if the platform name matches the hostname
          const platformMatchesHostname =
            (value.toLowerCase() === 'github' && hostname.includes('github')) ||
            (value.toLowerCase() === 'linkedin' && hostname.includes('linkedin'));

          return platformMatchesHostname;
        } catch (error) {
          // If the URL is invalid, don't proceed with validation
          return false;
        }
      },
      message: 'Invalid platform for the provided URL.',
    },
  },
  order: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
