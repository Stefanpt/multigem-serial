require('dotenv').config()
const jwt = require("jsonwebtoken");
const Campaign = require("../models/campaign.js");


async function isOpen(req, res, next) {

    const campaign = await Campaign.findOne({
        name: req.query.campaign
    });

    if(!campaign.isOpen) {
        return res.status(200).json({
            message: "Campaign isnt open",
            error: true
        });
    }

    next()
    
}

async function validSupply(req, res, next) {
    
    const campaign = await Campaign.findOne({
        name: req.query.campaign
    });

    if(campaign.supply == 0) {
        return res.status(200).json({
            message: "Campaign has minted out",
            error: true
        });
    }

    next()
    
}

async function validCampaign(req, res, next) {

    const campaign = await Campaign.findOne({
        name: req.query.campaign
    });

    if(!campaign) {
        return res.status(200).json({
            message: "Campaign not found",
            error: true
        });
    }

    next()
    
}

module.exports = {
    isOpen,
    validSupply,
    validCampaign
}