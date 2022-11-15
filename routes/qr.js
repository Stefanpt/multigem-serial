require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const { check } = require('express-validator');
const qrController = require('../controllers/qr.js');
const { qrLimiter } = require('../middleware/rateLimit')
const router = Router();


/* 
    This router is primarily to route traffic from QR codes scanned 
    in the field; the first point of entry into the campaign / claim

    Potentially:
        we could route traffic trying to access the dapp directly, back to this point?
        Capture details of incoming traffic - device info, datetime etc
    Function:
        Check if campaign is valid
        Check if campaign is open
        Check if there is anything left to claim
    Security
        Rate limit this entry point - removes stress from dapp
            This would work only is there was a single QR code vs 'ID specific' QR's
*/


const sanitizeValue = value => {
    var step1 = value.replace(/([^a-zA-Z]+)/gi, '')
    var step2 = step1.toLowerCase()
    return step2
}

    router.all(
        '/:campaign/',
        [
            qrLimiter,
            check('campaign').customSanitizer(value => {
                return sanitizeValue(value)
            })
        ], 
        qrController.claim
    )

module.exports = router;