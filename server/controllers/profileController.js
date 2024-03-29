const Profile = require('../modules/profile');
const cloudinary = require('../cloudinary')

async function uploadImageToCloudinary(req, res) {
  try {
    const imageURL = req.body.imageURL;

    const uploadedImage = await cloudinary.uploader.upload(imageURL, {
      upload_preset: 'unsigned',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
    });

    const secureUrl = uploadedImage.secure_url;
    return res.status(200).json(secureUrl);
  } catch (error) {
    console.log('Error uploading image to Cloudinary:', error);
    return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
  }
}


async function createUserProfile(req, res) {
  console.log(req.body)
  try {
    const { profileImage, firstName, lastName, profileEmail, userId } = req.body;

    // Create a new user profile using the Profile model
    const newProfile = await Profile.create({
      imageURL: profileImage,
      firstName,
      lastName,
      profileEmail,
      userId,
    });

    return res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
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
    console.error('Error updating user profile:', error);

    return res.status(500).json({ error: 'Failed to retrieve the user profile.' });
  }
}

async function updateUserProfileByUserId(req, res) {
  const infoId = req.params.id;
  const { profileImage, firstName, lastName, profileEmail,userId } = req.body;
  
  // console.log(req.body)
  try {
    // Find the profile with the given info ID
    let profileToUpdate = await Profile.findById(infoId);

    if (!profileToUpdate) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    // Update the user profile properties
   
    profileToUpdate.imageURL = profileImage; // Update imageURL with the Cloudinary URL
    profileToUpdate.firstName = firstName;
    profileToUpdate.lastName = lastName;
    profileToUpdate.profileEmail = profileEmail;
    profileToUpdate.userId = userId;

    // Save the updated user profile to the database
    await profileToUpdate.save();

    return res.json(profileToUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update the user profile.' });
  }
}

module.exports = {
  createUserProfile,
  getUserProfileByUserId,
  updateUserProfileByUserId,
  uploadImageToCloudinary,
};
