const Profile = require('../modules/profile');

async function createUserProfile(req, res) {
  console.log(req.body)
  try {
    const { profileImage, firstName, lastName, email, userId } = req.body;

    // Create a new user profile using the Profile model
    const newProfile = await Profile.create({
      profileImage,
      firstName,
      lastName,
      email,
      userId,
    });

    return res.status(201).json(newProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create the user profile.' });
  }
}

async function getUserProfileByUserId(req, res) {
  

  try {
    const userId = req.params.userId;
    // Find the user profile with the given user ID
    const profile = await Profile.find({ userId });

    if (!profile) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve the user profile.' });
  }
}

async function updateUserProfileByUserId(req, res) {
  const infoId = req.params.id;
  const { profileImage, firstName, lastName, email,userId } = req.body;

  try {
    // Find the info profile with the given info ID
    let profile = await profile.findById({ infoId });

    if (!profile) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // Update the user profile properties
    profile.profileImage = profileImage;
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.email = email;
    profile.userId = userId;

    // Save the updated user profile to the database
    await profile.save();

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update the user profile.' });
  }
}

module.exports = {
  createUserProfile,
  getUserProfileByUserId,
  updateUserProfileByUserId,
};
