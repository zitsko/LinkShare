const Link = require('../modules/link');

// Controller for creating a new link
async function createLink(req, res) {
  console.log(req.body)
  try {
    const { platform, customPlatform, url, order, userId } = req.body;

    // Create a new link using the Link model
    const newLink = await Link.create({
      platform,
      customPlatform,
      url,
      order,
      userId,
    });

    return res.status(201).json(newLink);
  } catch (error) {  
    return res.status(500).json({ error: 'Failed to create the link.' });
  }
}
// Controller for getting all links for a specific user
async function getAllLinks(req, res) {
  try {
    const userId = req.params.userId; // Get the user ID from the URL parameters

    // Retrieve all links from the database that have a matching user ID
    const links = await Link.find({ userId});

    return res.json(links);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve links.' });
  }
}


// Controller for getting a link by its ID
async function getLinkById(req, res) {
  const linkId = req.params.id;

  try {
    // Find the link with the given ID
    const link = await Link.findById(linkId);

    if (!link) {
      return res.status(404).json({ error: 'Link not found.' });
    }

    return res.json(link);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve the link.' });
  }
}

// Controller for updating a link by its ID
async function updateLinkById(req, res) {
  const linkId = req.params.id;
  const { platform, url, customPlatform, order, userId } = req.body;

  try {
    // Find the link with the given ID
    const link = await Link.findById(linkId);

    if (!link) {
      return res.status(404).json({ error: 'Link not found.' });
    }

    // Update the link properties
    link.platform = platform;
    link.url = url;
    link.customPlatform = customPlatform;
    link.order = order;
    link.userId = userId;

    // Save the updated link to the database
    await link.save();

    return res.json(link);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update the link.' });
  }
}

// Controller for deleting a link by its ID
async function deleteLinkById(req, res) {
  const linkId = req.params.id;

  try {
    // Find the link with the given ID and remove it from the database
    const deletedLink = await Link.findByIdAndRemove(linkId);

    if (!deletedLink) {
      return res.status(404).json({ error: 'Link not found.' });
    }

    return res.json(deletedLink);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete the link.' });
  }
}

// Controller for deleting all links
async function deleteAllLinks(req, res) {
    try {
      // Delete all links from the database
      const result = await Link.deleteMany();
  
      return res.json({ message: 'All links have been deleted.', deletedCount: result.deletedCount });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete all links.' });
    }
  }

module.exports = {
  createLink,
  getAllLinks,
  getLinkById,
  updateLinkById,
  deleteLinkById,
  deleteAllLinks,
};