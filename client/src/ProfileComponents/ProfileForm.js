import React from "react";

function ProfileForm({
  imageUrl,
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
      <div className="flex-col profile-form-container">

      <div>
        <label htmlFor="imageURL"></label>
        <input
          type="file"
          id="imageURL"
          name="imageURL"
          onChange={handleProfileImageChange}
          accept="image/png, image/jpeg, image/jpg, image/jfif"
        />
        {imageUrl && <img src={imageUrl} alt="Profile" />}
      </div>
      
        <div>
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="profile-inputs"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div>
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="profile-inputs"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <div>
          <label htmlFor="profileEmail"></label>
          <input
            type="email"
            id="profileEmail"
            name="profileEmail"
            placeholder="Email"
            className="profile-inputs"
            value={profileEmail}
            onChange={handleProfileEmailChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit} className="btn primary-btn big-btn"> 
          Save
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
