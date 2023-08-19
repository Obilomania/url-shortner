const asyncHandler = require("express-async-handler");
const { nanoid } = require("nanoid");
const URL = require("../models/urlModel");

const generateShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  const originalUrlExist = await URL.findOne({ fullUrl: originalUrl });
  if (originalUrlExist) {
    return res.status(200).json(originalUrlExist.shortUrl);
  }
  const newUrl = await URL.create({
    fullUrl: originalUrl,
  });
  return res.status(201).json(newUrl);
});



const getAllURL = asyncHandler(async (req, res) => {
  const allURL = await URL.find();
  return res.status(200).json(allURL);
});



const getShortURL = asyncHandler(async (req, res) => {
  const shortId = req.params.shortLink;
  const shortLink = await URL.findOne({ shortUrl: shortId });
  if (!shortLink) {
    res.status(404);
    throw new Error("Invalid Url");
  }
  shortLink.clicks++;
  await shortLink.save();

  res.redirect(shortLink.fullUrl);
});


const deleteURL = asyncHandler(async (req, res) => {
  const shortId = req.params.shortLink;
  const shortLink = await URL.findOneAndDelete({ shortUrl: shortId });
  if (!shortLink) {
    res.status(404);
    throw new Error("Invalid Url");
  }
  res.status(200).json({ message: "deleted" });
})

module.exports = {
  generateShortUrl,
  getAllURL,
  getShortURL,
  deleteURL
};
