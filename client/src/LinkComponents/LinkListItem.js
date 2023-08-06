
import React from "react";

function LinkListItem({ link, handleEditLink, handleDeleteLink }) {
  return (
    <div className="link-list-item-container items-background">

      <div className="platforms-link-container flex-col text">
        <p>Platform: {link.customPlatform || link.platform}</p>
        <p>Link: {link.url}</p>
      </div>
      
      
      <div className="edit-delete-btn-container flex-col">
        <button onClick={() => handleEditLink(link)} className="btn same-background-btn ">Edit</button>
        <button onClick={() => handleDeleteLink(link._id)} className="btn same-background-btn ">Delete</button>
      </div>
      
    </div>
  );
}

export default LinkListItem;
