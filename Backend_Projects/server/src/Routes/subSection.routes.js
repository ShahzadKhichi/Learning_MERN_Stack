const express = require("express");

const Router = express.Router();



const { createSubSection } = require("../Controllers/subSection.controller");
const { auth, isInstructor } = require("../middlewares/auth");

Router.post("/createSubSection", auth, isInstructor, createSubSection);




module.exports = Router;