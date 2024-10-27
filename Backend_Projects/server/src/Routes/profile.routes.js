const express = require("express");

const Router = express.Router();

const { updateProfile } = require("../Controllers/profile.controller");
const { auth } = require("../middlewares/auth");

Router.post("/updateProfile", auth, updateProfile);




module.exports = Router 