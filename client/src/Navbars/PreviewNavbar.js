import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function PreviewNavbar({ handleShareProfile, showConfirmationModal }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="preview-navbar-container">
      <li>
          <button onClick={() => navigate("/links")} className="btn light-btn">
            <FontAwesomeIcon icon={faLink} size="lg" /> 
          </button>
        </li>     

        <li>
          <button
            onClick={() => navigate("/profile")}
            className="btn light-btn"
          >
            <FontAwesomeIcon icon={faUser} size="lg" /> 
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              handleShareProfile();
              showConfirmationModal();
            }}
            className='btn primary-btn animated'
            >
              <FontAwesomeIcon icon={faShare} size="lg" />
              {" "} 
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
