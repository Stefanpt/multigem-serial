const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const GemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  clarity: {
    type: String,
    required: true,
  },
  cut: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    unique: true,
    dropDups: true
  }
});


module.exports = mongoose.model("Gem", GemSchema);