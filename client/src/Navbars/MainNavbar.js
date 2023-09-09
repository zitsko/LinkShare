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
          <button
            onClick={() => navigate("/links")}
            className="btn primary-btn"
          >
            <FontAwesomeIcon icon={faLink} className="icon-size" />
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/profile")}
            className="btn primary-btn"
          >
            <FontAwesomeIcon icon={faUser} className="icon-size" />
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/preview/")}
            className="btn primary-btn"
          >
            <FontAwesomeIcon icon={faEye} className="icon-size" />
          </button>
        </li>

        <li>
          <button
            className="btn intense-btn "
            onClick={() => {
              logout();
            }}
          >
            <FontAwesomeIcon icon={faPowerOff} className="icon-size" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;
