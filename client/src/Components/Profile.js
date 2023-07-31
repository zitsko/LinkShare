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
  const [showModal, setShowModal] = useState(false);

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
            // const storedProfileImage = localStorage.getItem("profileImage");
            // if (storedProfileImage) {
            //   setProfileImage(storedProfileImage);
            // }
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
      const response = await axios.get(
        `http://localhost:3636/profile/${userId}`
      );
      console.log("Response data:", response.data);
      setProfileDetails(response.data);
      console.log("Profile details fetched:", profileDetails);

      if (response.data.length > 0) {
        // If response data object is not empty, it means the user has an existing profile.
        // Set the state variables with the fetched profile data.
        const profileData = response.data[0];
        setName(profileData.firstName);
        setLastName(profileData.lastName);
        setProfileImage(profileData.profileImage || "");
        setProfileEmail(profileData.profileEmail);
        // localStorage.setItem("profileImage", profileData.profileImage || "");
      }
      // Store profile image URL in local storage
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  // Function to show the modal for a few seconds
  const showConfirmationModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000); // Change 3000 to the desired duration in milliseconds (e.g., 3000 for 3 seconds)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const profileData = null
    try {
      const profileData = {
        firstName: firstName,
        lastName: lastName,
        profileImage: profileImage,
        profileEmail: profileEmail,
        userId: user._id,
      };
      console.log("Profile Data:", profileData);

      if (profileDetails.length > 0) {
        // If profileDetails array is not empty, it means the user has an existing profile.
        // Get the _id from one of the profiles
        profileData._id = profileDetails[0]._id;

        // Perform a PUT request to update the profile.
        await axios.put(
          `http://localhost:3636/profile/${profileData._id}`,
          profileData
        );
        console.log("Profile details saved successfully!");
      } else {
        // If profileDetails array is empty, it means the user does not have a profile yet.
        // Perform a POST request to create a new profile.
        await axios.post("http://localhost:3636/profile", profileData);
        console.log("New profile created successfully!");
      }

      showConfirmationModal();
    } catch (error) {
      console.error("Error updating/creating profile details:", error);
    }
  };

  return (
    <div className="profile-container">
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
      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Profile Saved!</h2>
            <p>Your profile details have been successfully saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
