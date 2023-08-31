import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";
import LinkForm from "../LinkComponents/LinkForm";
import LinkList from "../LinkComponents/LinkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Links() {
  //-------- State Variables-----------
  const [platform, setPlatform] = useState(""); // State for the platform input
  const [customPlatform, setCustomPlatform] = useState(""); // New state for custom platform
  const [links, setLinks] = useState([]); //all links array
  const [selectedLink, setSelectedLink] = useState({}); // Provide a default value as an empty object
  const [linkUrl, setLinkUrl] = useState(""); // State for the link input
  const [showLinkForm, setShowLinkForm] = useState(false); //manage the visibility of LinkForm
  const [showStartInfo, setShowStartInfo] = useState(true); //manage the visibility of start info section
  const [isLoading, setIsLoading] = useState(true); //manage flickering issues when fetch
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });

  //-------- Use Effect-----------
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            setUser(data.userData);
            fetchLinks(data.userData._id); // Pass the user ID to fetchLinks function
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

  // Fetch all links from the backend based on user ID
  const fetchLinks = async (userId) => {
    try {
      // console.log("Fetching links for user:", userId);
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      // console.log("Response data:", response.data);
      setLinks(response.data);
      setShowStartInfo(response.data.length === 0);
      setIsLoading(false); //once data is fetched
    } catch (error) {
      console.error("Error fetching links:", error);
      setIsLoading(false);
    }
  };

  //-------- Handlers-------------

  const handleAddLink = () => {
    setShowLinkForm(true);
  };

  const handleCancel = () => {
    setShowLinkForm(false); // Hide the form
    setPlatform("");
    setCustomPlatform("");
    setLinkUrl("");
    setSelectedLink({});
    setShowWarning(false)
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleCustomPlatformChange = (e) => {
    setCustomPlatform(e.target.value);
  };

  const handleLinkURLChange = (e) => {
    const newLinkUrl = e.target.value;
    setLinkUrl(newLinkUrl); // Update the linkUrl state for the link input
    setIsUrlValid(isValidURL(newLinkUrl));
    // Hide the warning message when the user starts typing
    setShowWarning(false);
  };

  // Link Validation
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleEditLink = (link) => {
    setSelectedLink(link);
    // Set platform and customPlatform state with values from the selected link
    setPlatform(link.platform);
    setCustomPlatform("");
    setLinkUrl(link.url);
    setShowLinkForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUrlValid) {
      // Show a warning message to the user about the invalid URL
      setShowWarning(true);
      return;
    }
    // Prepare the data to be sent in the POST request
    var linkData = null;
    if (customPlatform) {
      linkData = {
        url: linkUrl,
        customPlatform: customPlatform,
        userId: user._id,
      };
    } else {
      linkData = {
        url: linkUrl,
        platform: platform,
        userId: user._id,
      };
    }

    try {
      // Make the POST request to save the link
      if (selectedLink._id) {
        // If an ID is present, update the link
        await axios.put(
          `http://localhost:3636/links/${selectedLink._id}`,
          linkData
        );
      } else {
        // If no ID, create a new link
        await axios.post("http://localhost:3636/links", linkData);
      }

      // Update the state to show the new link
      fetchLinks(user._id);

      // Clear the form fields after saving
      setPlatform("");
      setCustomPlatform("");
      setLinkUrl("");
      setSelectedLink({});
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  const handleDeleteLink = async (linkId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this link?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:3636/links/${linkId}`);
        fetchLinks(user._id);
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    }
  };

  const handleDeleteAllLinks = async () => {
    const shouldDeleteAll = window.confirm(
      "You will delete all your links. Are you sure?"
    );
    if (shouldDeleteAll) {
      try {
        await axios.delete("http://localhost:3636/links");
        setLinks([]);
      } catch (error) {
        console.error("Failed to delete all links:", error);
      }
    }
  };

  return (
    <div className="app-layout">
      <MainNavbar />

      {!isLoading && (
        <div className="links-container flex-col">
          {/* extra div for group h1 with p to narrow the margin*/}
          <div>
            <h1 className="heading text-shadow">
              Customize Your Links in LinkShare!
            </h1>
            <div className="text">
              <p>
                Easily add, edit, or remove links below to create your
                personalized profile. Share your favorite platforms, websites,
                and portfolios with the world in one convenient place. Show off
                your digital presence with style!
              </p>
            </div>
          </div>

          <button
            onClick={handleAddLink}
            className="btn big-btn no-background-btn animated"
          >
            Add a new link <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>

          {/* Render LinkForm if showLinkForm is true */}

          {showLinkForm && (
            <LinkForm
              platform={platform}
              customPlatform={customPlatform}
              linkUrl={linkUrl}
              selectedLink={selectedLink}
              handlePlatformChange={handlePlatformChange}
              handleCustomPlatformChange={handleCustomPlatformChange}
              handleLinkURLChange={handleLinkURLChange}
              handleSubmit={handleSubmit}
              handleDeleteAllLinks={handleDeleteAllLinks}
              handleCancel={handleCancel}
            />
          )}

          {showWarning && (
            <p className="warning-text">
              Please enter a valid URL.
            </p>
          )}

          <LinkList
            links={links}
            handleEditLink={handleEditLink}
            handleDeleteLink={handleDeleteLink}
          />

          {links.length > 0 && (
            <button
              onClick={handleDeleteAllLinks}
              className="btn no-background-intense-btn "
            >
              Delete All Links <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}

          {/* Initial content before adding links */}
          {showStartInfo && (
            <div
              className="start-info-section text"
              style={{ display: showLinkForm ? "none" : "block" }}
            >
              <h2>Let's get started!</h2>
              <p>
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!{" "}
              </p>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default Links;
