import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function LinkListItem({ link, handleEditLink, handleDeleteLink }) {
  return (
    <div className="link-list-item-container items-background">
      <div className="platforms-link-container flex-col text">
        <p>Platform: {link.customPlatform || link.platform}</p>
        <p>Link: {link.url}</p>
      </div>

      <div className="edit-delete-btn-container flex-col">
        <button
          onClick={() => handleEditLink(link)}
          className="btn same-background-btn "
        >
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
        </button>

        <button
          onClick={() => handleDeleteLink(link._id)}
          className="btn same-background-btn "
        >
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default LinkListItem;
