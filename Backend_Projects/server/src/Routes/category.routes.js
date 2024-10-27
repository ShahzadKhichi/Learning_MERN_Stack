const express = require("express");

const Router = express.Router();

const { createCategory, showAllCategory, categoryPageDetails } = require("../Controllers/Category.controllers");
const { isAdmin, isStudent, isInstructor, auth } = require("../middlewares/auth");

Router.post("/createCategory", auth, isAdmin, createCategory);
Router.get("/showAllCategory", auth, isAdmin, showAllCategory);
Router.get("/categoryPageDetails", auth, isAdmin, categoryPageDetails);


module.exports = Router 