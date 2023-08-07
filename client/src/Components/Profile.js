import React, { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";
import ProfileForm from "../ProfileComponents/ProfileForm";


function Profile() {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [uploadedImg, setUploadedImg] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDetails, setProfileDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
      setProfileDetails(response.data);

      if (response.data.length > 0) {
        // If response data object is not empty, it means the user has an existing profile.
        // Set the state variables with the fetched profile data.
        const profileData = response.data[0];
        setImageUrl(profileData.imageURL);
        setName(profileData.firstName);
        setLastName(profileData.lastName);
        setProfileEmail(profileData.profileEmail);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  // show the modal for a few seconds
  const showConfirmationModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000); 
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };   
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned");
      const imageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxhce0ar1/image/upload",
        formData
      );
      // Extract the Cloudinary URL for the uploaded image
      const imageURL = imageResponse.data.secure_url;
      console.log("imageUrl:",imageURL);

      // const uploadedImg = imageResponse.data.public_id;
      // console.log("uploadedImg:", uploadedImg);
      // setUploadedImg(uploadedImg);

      // Create or update the user profile with the profile details and the Cloudinary URL
      const profileData = {
        firstName: firstName,
        lastName: lastName,
        profileImage: imageUrl,
        profileEmail: profileEmail,
        userId: user._id,
      };

      // Now, perform a separate API call to the backend to handle the profile details
      if (profileDetails.length > 0) {
        // User already has a profile, update it
        profileData._id = profileDetails[0]._id;
        await axios.put(
          `http://localhost:3636/profile/${profileData._id}`,
          profileData
        );
      } else {
        // User doesn't have a profile yet, create a new one
        await axios.post("http://localhost:3636/profile", profileData);
        console.log("New profile created successfully!");
      }

      // Show the confirmation modal after successful submission
      showConfirmationModal();
    } catch (error) {
      console.error(
        "Error uploading image or updating/creating profile:",
        error
      );
    }
  };
 
  return (
    <div className="profile-container">
      <MainNavbar />
{!isLoading && (
      <div className="profile-details-container flex-col">
        <h1 className="text-shadow">Profile Details</h1>
        {imageUrl && <img src={imageUrl} alt="" className="profile-image" />}

        {/* Render ProfileForm to allow the user to edit and save the profile data */}
        <ProfileForm
          firstName={firstName}
          lastName={lastName}
          profileEmail={profileEmail}
          handleFirstNameChange={(e) => setName(e.target.value)}
          handleLastNameChange={(e) => setLastName(e.target.value)}
          handleProfileImageChange={handleProfileImageChange}
          handleProfileEmailChange={(e) => setProfileEmail(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </div>
      )}

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
