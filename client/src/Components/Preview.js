import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviewNavbar from "../Navbars/PreviewNavbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import backendUrl from "../configBackend";

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
        .post(`${backendUrl}/user/verify`, {
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
        `${backendUrl}/profile/${userId}`
      );
      setProfileDetails(response.data[0]); // Assuming the API returns an array of profiles we take the first one
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`${backendUrl}/links/${userId}`);
      setLinks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // Function to show the modal when "Share Links" button is clicked
  const handleShareProfile = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    showConfirmationModal();
  };

  const showConfirmationModal = () => {
    setShowProfileSavedModal(true);
    setTimeout(() => {
      setShowProfileSavedModal(false);
    }, 3000);
  };

  return (
    <div className="app-layout">
      <PreviewNavbar
        handleShareProfile={handleShareProfile}
        showConfirmationModal={showConfirmationModal}
      />
      {!isLoading && (
        <>
          <div className="profile-in-preview-container flex-col">
            <h1 className="heading text-shadow">Profile Preview</h1>

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
                  <div className="link-box-content">
                      {link.customPlatform || link.platform}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="animated"
                      size="xl"
                      />
                  </div>
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
