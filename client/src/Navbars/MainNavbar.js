import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

function MainNavbar() {
  const navigate = useNavigate();

  function logout() {
    const shouldLogout = window.confirm(
      "You are about to leave ,are you sure?"
    );
    if (shouldLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <nav>
      <ul className="main-navbar-container">
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
            onClick={() => navigate("/preview/")}
            className="btn light-btn"
          >
            <FontAwesomeIcon icon={faEye} size="lg" /> Preview
          </button>
        </li>

        <li>
        <button
            className="btn intense-btn "
            onClick={() => {
              logout();
            }}
          >
             <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;
