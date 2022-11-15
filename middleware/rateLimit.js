require('dotenv').config()
const rateLimiter = require("express-rate-limit");


const claimLimiter = rateLimiter({
    max: 2, // max number of requests per IP
    windowMs: 1 * 60 * 1000, // 15 mins
    message: "Too many request from this IP",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipFailedRequests: true
})

const qrLimiter = rateLimiter({
    max: 20, // max number of requests per IP
    windowMs: 1 * 60 * 1000, // 1 mins
    message: "Too many request from this IP",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipFailedRequests: true
})
 
module.exports = {
    claimLimiter,
    qrLimiter
}