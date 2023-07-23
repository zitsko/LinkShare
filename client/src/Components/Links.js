import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainNavbar from "../Navbars/MainNavbar";
import axios from "axios";

function Links() {
  const [platform, setPlatform] = useState(""); // State for the platform input
  const [customPlatform, setCustomPlatform] = useState(""); // New state for custom platform
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: '',
    email: '',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .post('http://localhost:3636/user/verify', {
          token: localStorage.getItem('token'),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            console.log(data);
            setUser(data.userData);
            fetchLinks(data.userData._id); // Pass the user ID to fetchLinks function
          } else {
            navigate('/');
          }
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, []);
  
  // Function to fetch all links from the backend based on user ID
  const fetchLinks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3636/links/${userId}`);
      setLink(response.data);
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
    setLink(e.target.value);
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
            <option value="other">Other</option> {/* Option for other platform */}
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
              value={link}
              onChange={handleLinkChange}
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
      </div>
    </div>
  );
}

export default Links;
