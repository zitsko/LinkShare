import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";

function Links() {
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

  // Function to fetch all links from the backend based on user ID
  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // Event handler for platform input
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleCustomPlatformChange = (e) => {
    setCustomPlatform(e.target.value);
  };

  // Event handler for link input
  const handleLinkChange = (e) => {
    setLinks(e.target.value);
  };

    // Event handler for editing a link
    const handleEditLink = (link) => {
        setSelectedLink(link);
        // Set platform and customPlatform state with values from the selected link
        setPlatform(link.platform);
        setCustomPlatform(""); // Reset the custom platform state when editing        // Set link state with value from the selected link
      };

      // Event handler for link input
  const handleLinkURLChange = (e) => {
    setLinkUrl(e.target.value); // Update the linkUrl state for the link input
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
    
            {/* Form for adding a new link */}
            <form>
              <div>
                <label htmlFor="platform">Platform:</label>
                <select
                  id="platform"
                  name="platform"
                  value={platform}
                  onChange={handlePlatformChange}
                >
                  <option value="">Select a platform</option>
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="other">Other</option>{" "}
                  {/* Option for other platform */}
                  {/* Add more options for other platforms */}
                </select>
              </div>
    
              {/* New input for custom platform */}
              {platform === "other" && (
                <div>
                  <label htmlFor="customPlatform">Custom Platform:</label>
                  <input
                    type="text"
                    id="customPlatform"
                    name="customPlatform"
                    value={customPlatform}
                    onChange={handleCustomPlatformChange}
                  />
                </div>
              )}
    
              <div>
                <label htmlFor="link">Link:</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={linkUrl}
                  onChange={handleLinkURLChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
    
            <div className="start-info-section">
              <h2>Let's get started!</h2>
              <p>
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help you
                share your profiles with everyone!{" "}
              </p>
            </div>
    
            {/* Render all links */}
            {links.map((link) => (
              <div key={link._id}>
                <p>Title: {link.title}</p>
                <p>URL: {link.url}</p>
                <p>Description: {link.description}</p>
                <p>Platform: {link.platform}</p>
                {/* Edit button */}
                <button onClick={() => handleEditLink(link)}>Edit</button>
                {/* <button onClick={() => handleDeleteLink(link._id)}>Delete</button> */}
              </div>
            ))}
          </div>
        </div>
      );
            }    

export default Links;
