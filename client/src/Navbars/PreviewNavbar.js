import React from "react";
import { useNavigate } from "react-router-dom";

function PreviewNavbar({ handleShareLinks, showConfirmationModal }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="preview-navbar-container">
        <li>
          <button onClick={() => navigate("/links")}>Back to Links</button>
        </li>
        <li>
          <button
            onClick={() => {
              handleShareLinks();
              showConfirmationModal();
            }}
          >
            Share Links
          </button>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
