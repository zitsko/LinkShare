import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";
import ProfileForm from "../ProfileComponents/ProfileForm";

function Profile() {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDetails, setProfileDetails] = useState({});
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            console.log(data);
            setUser(data.userData);
            fetchProfileDetails(data.userData._id);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  const fetchProfileDetails = async (userId) => {
    try {
      console.log("Fetching profile details for user:", userId);
      const response = await axios.get(`http://localhost:3636/profile/${userId}`);
      console.log("Response data:", response.data);
      setProfileDetails(response.data); 
      console.log("Profile details fetched:", profileDetails);
    //   if (response.data.length > 0) {
    //     // If response data object is not empty, it means the user has an existing profile.
    //     // Set the state variables with the fetched profile data.
    //     const profileData = response.data;
    //     setName(profileData.firstName);
    //     setLastName(profileData.lastName);
    //     setProfileImage(profileData.profilePhoto);
    //     setProfileEmail(profileData.email);
    //   }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const profileData = null
    try {
        const profileData = {
        firstName: firstName,
        lastName: lastName,
        profilePhoto: profileImage,
        profileEmail: profileEmail,
        userId: user._id,
      };
      console.log("Profile Data:", profileData);
      
      if (profileDetails.length > 0) {
        // If profileDetails array is not empty, it means the user has an existing profile.
        // Get the _id from one of the profiles (you can choose the first one in this case).
        profileData._id = profileDetails[0]._id;
  
        // Perform a PUT request to update the profile.
        await axios.put(`http://localhost:3636/profile/${profileData._id}`, profileData);
        console.log("Profile details updated successfully!");
      } else {
        // If profileDetails array is empty, it means the user does not have a profile yet.
        // Perform a POST request to create a new profile.
        await axios.post("http://localhost:3636/profile", profileData);
        console.log("New profile created successfully!");
      }
    } catch (error) {
      console.error("Error updating/creating profile details:", error);
    }
  };
  

  return (
    <div>
      <MainNavbar />
      <h1>Profile Details</h1>

      {/* Render ProfileForm to allow the user to edit and save the profile data */}
      <ProfileForm
        firstName={firstName}
        lastName={lastName}
        profileImage={profileImage}
        profileEmail={profileEmail}
        handleFirstNameChange={(e) => setName(e.target.value)}
        handleLastNameChange={(e) => setLastName(e.target.value)}
        handleProfileImageChange={(e) => setProfileImage(e.target.value)}
        handleProfileEmailChange={(e) => setProfileEmail(e.target.value)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Profile;
