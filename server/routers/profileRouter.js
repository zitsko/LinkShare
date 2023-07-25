const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route for creating a new user profile
router.post('/', profileController.createUserProfile);

// Route for getting a user profile by user ID
router.get('/:userId', profileController.getUserProfileByUserId);

// Route for updating a user profile by user ID
router.put('/:id', profileController.updateUserProfileByUserId);

module.exports = router;

