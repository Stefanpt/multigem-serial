require('dotenv').config()
const jwt = require("jsonwebtoken");
const Claim = require("../models/claim.js");


async function hasClaimed(req, res, next) {

    const claimed = await Claim.findOne({
        address: req.body.account
    });

    if(claimed) {
        return res.status(404).json({
            message: "Address already claimed",
            error: true
        });
    }

    next()
    
}

module.exports = {
    hasClaimed
}