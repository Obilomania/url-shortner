const mongoose = require("mongoose");
const shortId = require('shortid')


const urlSchema = mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
    //   unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const URL = mongoose.model("Url", urlSchema);
module.exports = URL;
