const express = require("express");

const Router = express.Router();

const { createSection, updateSection, deleteSection } = require("../Controllers/section.controller");

const { auth, isInstructor } = require("../middlewares/auth");

Router.post("/createSection", auth, isInstructor, createSection);
Router.post("/updateSection", auth, isInstructor, updateSection);
Router.post("/deleteSection", auth, isInstructor, deleteSection);

module.exports = Router;