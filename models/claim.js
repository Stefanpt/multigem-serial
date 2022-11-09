const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const ClaimSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model("Claim", ClaimSchema);