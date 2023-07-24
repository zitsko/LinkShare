const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// Route for creating a new link
router.post('/', linkController.createLink);

// Route for getting a link by its ID
router.get('/:id', linkController.getLinkById);

// Route for getting all links for the user
router.get('/:userId', linkController.getAllLinks);


// Route for updating a link by its ID
router.put('/:id', linkController.updateLinkById);

// Route for deleting a link by its ID
router.delete('/:id', linkController.deleteLinkById);

// Route for deleting all links
router.delete('/', linkController.deleteAllLinks);

module.exports = router;
