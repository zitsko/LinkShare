
import React from "react";

function LinkListItem({ link, handleEditLink, handleDeleteLink }) {
  return (
    <div>
      {/* <p>Platform: {link.platform}</p>
      {link.customPlatform && <p>Custom Platform: {link.customPlatform}</p>} */}
      <p>Platform: {link.customPlatform || link.platform}</p>
      <p>URL: {link.url}</p>
      <button onClick={() => handleEditLink(link)}>Edit</button>
      <button onClick={() => handleDeleteLink(link._id)}>Delete</button>
    </div>
  );
}

export default LinkListItem;
