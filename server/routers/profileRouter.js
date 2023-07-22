// routes/profileRouter.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route for creating a new user profile
router.post('/', profileController.createUser);

// Route for getting a user profile by ID
router.get('/:id', profileController.getUserById);

// Route for updating a user profile by ID
router.put('/:id', profileController.updateUserById);

// Route for deleting a user profile by ID
router.delete('/:id', profileController.deleteUserById);

module.exports = router;
