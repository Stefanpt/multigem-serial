const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set: setPassword
  }
});

UserSchema.index({email: 1}, {unique: true})

module.exports = mongoose.model("User", UserSchema);