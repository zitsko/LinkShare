import React from "react";
import { useNavigate } from "react-router-dom";

function PreviewNavbar({ handleShareLinks, showConfirmationModal }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="preview-navbar-container">
        <li>
          <button onClick={() => navigate("/links")} className='btn light-btn'>Links</button>
        </li>      

        <li>
          <button onClick={() => navigate('/profile')}className='btn light-btn'>Profile</button>
        </li>

        <li>
          <button
            onClick={() => {
              handleShareLinks();
              showConfirmationModal();
            }}
            className='btn primary-btn'
            >
            Share Links
          </button>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default PreviewNavbar;
