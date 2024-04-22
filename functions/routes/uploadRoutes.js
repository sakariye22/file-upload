const express = require("express");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const {
  authenticateToken,
  tokenBlacklist,
} = require("../middleware/authenticate-token");

// Import the functions and the upload middleware from your controller file
const {
  getProfilePictureUrl,
  PostProfilePicture,
  upload,
  getProfilePictureNative,
} = require("../controller/documentController.js");

router.post("/update-image", authenticateToken, upload, PostProfilePicture);

router.get("/profile-image", authenticateToken, getProfilePictureUrl);
router.get("/profile-image2", authenticateToken, getProfilePictureNative);

module.exports = router;
