const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  supply: {
    type: Number,
    required: true,
  },
  tokenIds: {
    type: Array
  }
});


module.exports = mongoose.model("Campaign", CampaignSchema);