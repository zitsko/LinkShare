import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import PreviewNavbar from "../Navbars/PreviewNavbar";
import axios from "axios";
import ImagePreview from "./ImagePreview";

function Preview({ uploadedImg }) {
  console.log("uploadedImg prop in Preview:", uploadedImg);
  const [links, setLinks] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [showProfileSavedModal, setShowProfileSavedModal] = useState(false);


  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });

 
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
            fetchLinks(data.userData._id);
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
      console.log("Response data:", response.data);
      setProfileDetails(response.data[0]); // Assuming the API returns an array of profiles we take the first one
      console.log("Profile details fetched:", profileDetails);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const fetchLinks = async (userId) => {
    try {
      console.log("Fetching links for user:", userId);
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      console.log("Response data:", response.data);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // Function to copy profile details and links to clipboard
  const handleCopyLinks = () => {
    const formattedLinks = links
      .map(
        (link) =>
          `${link.customPlatform || link.platform}\n${link.url}`
      )
      .join("\n\n");

    const formattedProfileDetails = `
          ${profileDetails.firstName} ${profileDetails.lastName}
          ${profileDetails.profileEmail}
        `;

    const contentToCopy =
      formattedProfileDetails + "\n" + formattedLinks;

    // Copy the content to clipboard
    navigator.clipboard.writeText(contentToCopy);
  };

 
  // Function to show the modal when "Share Links" button is clicked
  const handleShareLinks = () => {
    handleCopyLinks(); // Call the existing function to copy links and profile details
    };

    const showConfirmationModal = () => {
        setShowProfileSavedModal(true);
        setTimeout(() => {
          setShowProfileSavedModal(false);
        }, 3000); // Change 3000 to the desired duration in milliseconds (e.g., 3000 for 3 seconds)
      };
      
  
  return (
    
    <div className="preview-container">     
      <PreviewNavbar handleShareLinks={handleShareLinks} showConfirmationModal={showConfirmationModal} />
    
      <h1>Profile Preview</h1>

      {uploadedImg && <ImagePreview uploadedImg={uploadedImg} />}

      <p> {profileDetails.firstName} {profileDetails.lastName}</p>
      <p> {profileDetails.profileEmail}</p>  

      {links.length > 0 ? (
        <ul>
          {links.map((link) => (
            <li key={link._id}>
              <p>{link.customPlatform || link.platform}</p>{" "}
              <p>{link.url}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No links found.</p>
      )}

      {/* <Links /> */}
      {showProfileSavedModal && (
  <div className="share-links-modal">
    <div className="share-links-modal-content">
      <h2>Links Shared!</h2>
      <p>Your profile details and links have been copied to the clipboard.</p>
    </div>
  </div>
)}

    </div>
  );
}
export default Preview;
