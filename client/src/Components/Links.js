import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";
import LinkForm from "../LinkComponents/LinkForm";
import LinkList from "../LinkComponents/LinkList";

function Links() {
  //-------- State Variables-----------
  const [platform, setPlatform] = useState(""); // State for the platform input
  const [customPlatform, setCustomPlatform] = useState(""); // New state for custom platform
  const [links, setLinks] = useState([]); //all links array
  const [selectedLink, setSelectedLink] = useState({}); // Provide a default value as an empty object
  const [linkUrl, setLinkUrl] = useState(""); // State for the link input
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
            console.log(data);
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
      console.log("Fetching links for user:", userId);
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      console.log("Response data:", response.data);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  //-------- Handlers-------------

  // Event handler for platform input
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleCustomPlatformChange = (e) => {
    setCustomPlatform(e.target.value);
  };

  // Event handler for link url input
  const handleLinkURLChange = (e) => {
    setLinkUrl(e.target.value); // Update the linkUrl state for the link input
  };
  
  // Event handler for editing a link
  const handleEditLink = (link) => {
    setSelectedLink(link);
    // Set platform and customPlatform state with values from the selected link
    setPlatform(link.platform);
    setCustomPlatform("");
    setLinkUrl(link.url);
  };

  // Event handler for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent in the POST request
    const linkData = {
      url: linkUrl,
      platform: customPlatform || platform,
      userId: user._id,
    };

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
        const response = await axios.post("http://localhost:3636/links", linkData);
        console.log("Response data:", response.data);
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

  // Handle Delete Link
  const handleDeleteLink = async (linkId) => {
    try {
      await axios.delete(`http://localhost:3636/links/${linkId}`);
      fetchLinks(user._id);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="links-navbar-container">
      <MainNavbar />
      <div>
        <h1>Customize Your Links in LinkShare!</h1>
        <p>
          Easily add, edit, or remove links below to create your personalized
          profile. Share your favorite platforms, websites, and portfolios with
          the world in one convenient place. Show off your digital presence with
          style!
        </p>
        <button>+Add a new link</button>

        <LinkForm
          platform={platform}
          customPlatform={customPlatform}
          linkUrl={linkUrl}
          handlePlatformChange={handlePlatformChange}
          handleCustomPlatformChange={handleCustomPlatformChange}
          handleLinkURLChange={handleLinkURLChange}
          handleSubmit={handleSubmit}
        />

        <LinkList
          links={links}
          handleEditLink={handleEditLink}
          handleDeleteLink={handleDeleteLink}
        />
 

        {/* Initial content before adding links */}
        <div className="start-info-section disabled">
          <h2>Let's get started!</h2>
          <p>
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Links;
