
import React from "react";

function LinkListItem({ link, handleEditLink, handleDeleteLink }) {
  return (
    <div className="link-list-item-container">

      <div>
        <p>Platform: {link.customPlatform || link.platform}</p>
        <p>URL: {link.url}</p>
      </div>

      <div className="edit-delete-btn-container">
        <button onClick={() => handleEditLink(link)} className="btn primary-btn circle-btn">Edit</button>
        <button onClick={() => handleDeleteLink(link._id)} className="btn no-background-intense-btn circle-btn">Delete</button>
      </div>
    </div>
  );
}

export default LinkListItem;
