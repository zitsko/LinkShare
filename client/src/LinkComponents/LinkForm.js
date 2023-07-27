
import React from "react";

function LinkForm({
  platform,
  customPlatform,
  linkUrl,
  handlePlatformChange,
  handleCustomPlatformChange,
  handleLinkURLChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form>
      <div >
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

        {/* Link URL Input */}
        <div>
        <label htmlFor="linkUrl">Link URL:</label>
        <input
          type="text"
          id="linkUrl"
          name="linkUrl"
          value={linkUrl}
          onChange={handleLinkURLChange}
        />
      </div>

      {/* Submit button */}
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
      
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default LinkForm;