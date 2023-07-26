import React from "react";

function ProfileForm({
  profileImage,
  firstName,
  lastName,
  profileEmail,
  handleProfileImageChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleProfileEmailChange,
  handleSubmit,
}) {
  return (
    <form>
      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        <input
          type="text"
          id="profileImage"
          name="profileImage"
          value={profileImage}
          onChange={handleProfileImageChange}
        />
        {profileImage && <img src={profileImage} alt="Profile" />}
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div>
        <label htmlFor="profileEmail">Email:</label>
        <input
          type="email"
          id="profileEmail"
          name="profileEmail"
          value={profileEmail}
          onChange={handleProfileEmailChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
}

export default ProfileForm;

