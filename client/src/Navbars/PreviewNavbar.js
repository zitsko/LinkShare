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
          <button
            onClick={() => navigate("/links")}
            className="btn no-background-primary-btn"
          >
            <FontAwesomeIcon icon={faLink} className="icon-size" />
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/profile")}
            className="btn no-background-primary-btn"
          >
            <FontAwesomeIcon icon={faUser} className="icon-size" />
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              handleShareProfile();
              showConfirmationModal();
            }}
            className="btn primary-btn animated"
          >
            <FontAwesomeIcon icon={faShare} className="icon-size" />{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
