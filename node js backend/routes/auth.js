const express = require("express");
const router =express.Router();
const authController= require("../controllers/authController");

router.post("/",authController.handlelogin);

module.exports =router;