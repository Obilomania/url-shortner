const express = require("express");
const {
  generateShortUrl,
  getShortURL,
  getAllURL,
  deleteURL,
} = require("../controllers/urlController");
const router = express.Router();

router.post("/", generateShortUrl);
router.get("/", getAllURL);
router.get("/:shortLink", getShortURL);
router.delete("/:shortLink", deleteURL);

module.exports = router;
