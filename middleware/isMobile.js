require('dotenv').config()
const jwt = require("jsonwebtoken");


async function isMobile(req, res, next) {

    var parser = require('ua-parser-js');
    
    var ua = parser(req.headers['user-agent']);

    if(ua.device.type != "mobile") {
        if(ua.os.name != "iOS" || "Android" || "Windows [Phone/Mobile]") {
            return res.status(200).json({
                message: "couldnt detect device",
                error: true
            })
        }
    }

    next()
    
}


module.exports = {
    isMobile
}