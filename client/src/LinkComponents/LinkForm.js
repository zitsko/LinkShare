
import React from "react";

function LinkForm({
  platform,
  customPlatform,
  linkUrl,
  linkTitle,
  handlePlatformChange,
  handleCustomPlatformChange,
  handleLinkTitleChange,
  handleLinkURLChange,
  handleSubmit,
}) {
  return (
    <form>
      <div>
        <label htmlFor="platform">Platform:</label>
        <select
         id="platform"
         name="platform"
         value={platform}
         onChange={handlePlatformChange}
        >
          <option value="">Select a platform</option>
          <option value="github">GitHub</option>
          <option value="linkedin">LinkedIn</option>
          <option value="other">Other</option>
          {/* Add more options for other platforms */}
        </select>
      </div>

      {/* New input for custom platform */}
      {platform === "other" && (
        <div>
          <label htmlFor="customPlatform">Custom Platform:</label>
          <input
            type="text"
            id="customPlatform"
            name="customPlatform"
            value={customPlatform}
            onChange={handleCustomPlatformChange}
          />
        </div>
      )}

      {/* Link Input */}
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          value={linkUrl}
          onChange={handleLinkURLChange}
        />
      </div>

      {/* Submit button */}
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
}

export default LinkForm;

