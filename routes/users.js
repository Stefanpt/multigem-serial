require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware } = require("express-kun");
const userController = require('../controllers/user');
const router = Router();


const protectedRouter = withJWTAuthMiddleware(router, process.env.TOKEN_SECRET);

router.post("/", userController.create);
protectedRouter.get("/", userController.getAll);
router.post("/login", userController.login);
protectedRouter.get("/:id", userController.get);


module.exports = router;
