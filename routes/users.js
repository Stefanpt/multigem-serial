require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const userController = require('../controllers/user');
const { isAdmin } = require('../middleware/isAdmin')
const router = Router();
const { check, validationResult } = require('express-validator');


const protectedRouter = withJWTAuthMiddleware(router, process.env.TOKEN_SECRET);

const protectedRoleRouter = withMiddleware(protectedRouter, isAdmin);

router.post("/", [

    check('email', 'Your email is not valid').isEmail(),

],userController.create);

protectedRoleRouter.get("/", userController.getAll);

router.post("/login", userController.login);

protectedRouter.get("/:id", userController.get);



module.exports = router;
