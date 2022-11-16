const Campaign = require("../models/campaign.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


/* 
    Run checks
    Redirect to campaign
*/
async function claim(req, res) {

    const { campaign } = req.params;

    const campaign_result = await Campaign.findOne({
        name: campaign
    });

    // Check if the campaign is active / excists
    if(campaign_result && campaign_result.isOpen == true) {

        // Check if the campaign has minted out
        if(campaign_result.supply > 0) {

            const frontendUrl = new URL('http://localhost:3001/');

            frontendUrl.searchParams.append("campaign", campaign);

            return res.redirect(frontendUrl.href);
            // res.render('index', { title: 'Whoop', message: "There be more booty here"})

        } else {
            res.render('index', { title: 'Too bad', message: "You were too late"})
        }


    } else {
        res.render('index', { title: 'Be patient', message: "This campaign isnt active yet"})
    }

}



module.exports = {
  claim
};