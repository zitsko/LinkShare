
import React from "react";

function LinkListItem({ link, handleEditLink, handleDeleteLink }) {
  return (
    <div>
      <p>Title: {link.title}</p>
      <p>URL: {link.url}</p>
      <p>Description: {link.description}</p>
      <p>Platform: {link.platform}</p>
      <button onClick={() => handleEditLink(link)}>Edit</button>
      <button onClick={() => handleDeleteLink(link._id)}>Delete</button>
    </div>
  );
}

export default LinkListItem;
