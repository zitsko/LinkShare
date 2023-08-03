import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

function ImagePreview({ uploadedImg }) {
  console.log("uploadedImg prop in ImagePreview:", uploadedImg);
  // Cloudinary fetching image
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxhce0ar1",
    },
  });

  // Construct the Cloudinary URL for the image using the uploadedImg prop
  const myImage = cld.image(uploadedImg);

  return (
    <div>
      {/* Use AdvancedImage to show the Cloudinary image */}
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}

export default ImagePreview;
