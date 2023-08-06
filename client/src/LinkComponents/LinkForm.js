
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
      <div className="platform-link-container flex-col">
      <div >
          <label htmlFor="platform"></label>
          <select
           id="platform"
           name="platform"
           value={platform}
           onChange={handlePlatformChange}
           className="platform-dropdown"
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
            <label htmlFor="customPlatform"></label>
            <input
              type="text"
              id="customPlatform"
              name="customPlatform"
              placeholder="Enter your custom platform here"
              value={customPlatform}
              onChange={handleCustomPlatformChange}
              className="links-inputs"
            />
          </div>
        )}
          {/* Link URL Input */}
          <div>
          <label htmlFor="linkUrl"></label>
          <input
            type="text"
            id="linkUrl"
            name="linkUrl"
            placeholder="Enter your link here"
            value={linkUrl}
            onChange={handleLinkURLChange}
            className="links-inputs"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="save-cancel-btn-container">
        <button type="submit" onClick={handleSubmit} className="btn primary-btn">
          Save
        </button>
        
        <button type="button" onClick={handleCancel} className="btn no-background-intense-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LinkForm;