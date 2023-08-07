import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviewNavbar from "../Navbars/PreviewNavbar";
import axios from "axios";
// import ImagePreview from "./ImagePreview";

function Preview() {
  const [links, setLinks] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [showProfileSavedModal, setShowProfileSavedModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
      const response = await axios.get(
        `http://localhost:3636/profile/${userId}`
      );
      console.log("Response data:", response.data);
      setProfileDetails(response.data[0]); // Assuming the API returns an array of profiles we take the first one
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      setLinks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // Function to copy profile details and links to clipboard
  const handleCopyLinks = () => {
    const formattedLinks = links
      .map((link) => `${link.customPlatform || link.platform}\n${link.url}`)
      .join("\n\n");

    const formattedProfileDetails = `
          ${profileDetails.firstName} ${profileDetails.lastName}
          ${profileDetails.profileEmail}
        `;

    const contentToCopy = formattedProfileDetails + "\n" + formattedLinks;

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
      <PreviewNavbar
        handleShareLinks={handleShareLinks}
        showConfirmationModal={showConfirmationModal}
      />
      {!isLoading && (
        <>
          <div className="profile-in-preview-container flex-col">
            <h1 className="text-shadow">Profile Preview</h1>
            <img
              src={profileDetails.imageURL}
              alt=""
              className="profile-image"
            />

            {/* FullName-Email */}
            <div>
              <h2 className="full-name">
                {" "}
                {profileDetails.firstName} {profileDetails.lastName}
              </h2>
              <p className="text"> {profileDetails.profileEmail}</p>
            </div>
          </div>

          {/* Links */}
          {links.length > 0 ? (
            <ul className="clickable-links-container flex-col">
              {links.map((link) => (
                <li key={link._id} className="link-box">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-link-text"
                  >
                    {link.customPlatform || link.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No links found.</p>
          )}
        </>
      )}

      {showProfileSavedModal && (
        <div className="share-links-modal">
          <div className="share-links-modal-content">
            <h2>Links Shared!</h2>
            <p>
              Your profile details and links have been copied to the clipboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Preview;
