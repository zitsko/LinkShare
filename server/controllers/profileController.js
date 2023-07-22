// controllers/profileController.js
const Profile = require('../modules/profile');

// Controller for creating a new user profile
async function createUser(req, res) {
  try {
    const { profilePhoto, firstName, lastName, email } = req.body;

    // Check if a profile with the same email already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ error: 'A profile with this email already exists.' });
    }

    // Create a new profile
    const profile = await Profile.create({
      profilePhoto,
      firstName,
      lastName,
      email,
    });

    return res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create the user profile.' });
  }
}

// Controller for getting a user profile by ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch the user profile.' });
  }
}

// Controller for updating a user profile by ID
async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { profilePhoto, firstName, lastName, email } = req.body;

    // Check if a profile with the same email already exists
    const existingProfile = await Profile.findOne({ email });
    //prevent user update with email taken from another user
    if (existingProfile && existingProfile._id.toString() !== id) {
      return res.status(400).json({ error: 'A profile with this email already exists.' });
    }

    const profile = await Profile.findByIdAndUpdate(
      id,
      { profilePhoto, firstName, lastName, email },
      { new: true } //ensure updated profile is returned
    );

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update the user profile.' });
  }
}

// Controller for deleting a user profile by ID
async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found.' });
    }

    return res.json({ message: 'Profile deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete the user profile.' });
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
