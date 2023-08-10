import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function PreviewNavbar({ handleShareLinks, showConfirmationModal }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="preview-navbar-container">
      <li>
          <button onClick={() => navigate("/links")} className="btn light-btn">
            <FontAwesomeIcon icon={faLink} size="lg" /> Links
          </button>
        </li>     

        <li>
          <button
            onClick={() => navigate("/profile")}
            className="btn light-btn"
          >
            <FontAwesomeIcon icon={faUser} size="lg" /> Profile
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              handleShareLinks();
              showConfirmationModal();
            }}
            className='btn primary-btn animated'
            >
              <FontAwesomeIcon icon={faShare} size="lg" />
              {" "} Share Profile
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
