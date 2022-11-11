require('dotenv').config()
const jwt = require("jsonwebtoken");
const Claim = require("../models/claim.js");


async function hasClaimed(req, res, next) {

    const claimed = await Claim.findOne({
        address: req.query.account
    });

    if(claimed) {
        return res.status(200).json({
            message: "Address already claimed",
            error: true
        });
    }

    next()
    
}

module.exports = {
    hasClaimed
}