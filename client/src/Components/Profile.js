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
  const [userImg, setuserImg] = useState("");
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
        .post(`${backendUrl}/user/verify`, {
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
        `${backendUrl}/profile/${userId}`
      );
      setProfileDetails(response.data);

      if (response.data.length > 0) {
        // If response data object is not empty, it means the user has an existing profile.
        // Set the state variables with the fetched profile data.
        const profileData = response.data[0];
        setImageUrl(profileData.imageURL);//to keep the image after refresh
        setuserImg(profileData.imageURL)
        setName(profileData.firstName);
        setLastName(profileData.lastName);
        setProfileEmail(profileData.profileEmail);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
    } else {
      setImageUrl("");
    }
  };


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setFile(file);
    previewFiles(file);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const profileData = {
        firstName: firstName,
        lastName: lastName,
        profileEmail: profileEmail,
        profileImage : userImg,
        userId: user._id,
      };
      if(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned");
        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxhce0ar1/image/upload",
          formData
        );
        const imageURL = imageResponse.data.secure_url;
        console.log("imageUrl:",imageURL);
        profileData.profileImage = imageURL
      } 
    

      // Create or update the user profile with the profile details and the Cloudinary URL
     
      // Now, perform a separate API call to the backend to handle the profile details
      if (profileDetails.length > 0) {
        // User already has a profile, update it
        profileData._id = profileDetails[0]._id;
        await axios.put(
          `${backendUrl}/profile/${profileData._id}`,
          profileData
        );
      } else {
        // User doesn't have a profile yet, create a new one
        await axios.post(`${backendUrl}/profile`, profileData);
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

    // show the modal 
    const showConfirmationModal = () => {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000); 
    };
     
  return (
    <div className="app-layout">
      <MainNavbar />
{!isLoading && (
      <div className="profile-details-container flex-col">
        <h1 className="heading text-shadow">Profile Details</h1>
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
