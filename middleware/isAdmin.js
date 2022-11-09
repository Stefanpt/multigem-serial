require('dotenv').config()
const jwt = require("jsonwebtoken");


function isAdmin(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new Error("No Authorization Header");
    }
    try {
        const token = authorization?.split("Bearer ")[1];
        const decodedToken = jwt.verify(token,  process.env.TOKEN_SECRET);

        if (decodedToken.user.role !== "admin") {
            return res.status(404).json({
              message: "User Not Admin",
              error: true
            });
        }

        next()
    } catch {
        throw new Error("Invalid Token Format");
        // return res.status(500).json({ message: "An error has occured" });
    }
    
}

module.exports = {
    isAdmin
}