import React from "react";
import LinkListItem from "./LinkListItem";

function LinkList({ links, handleEditLink, handleDeleteLink }) {
  return (
    <div>
      {links.map((link) => (
        <LinkListItem
          key={link._id}
          link={link}
          handleEditLink={handleEditLink}
          handleDeleteLink={handleDeleteLink}
        />
      ))}
    </div>
  );
}

export default LinkList;
