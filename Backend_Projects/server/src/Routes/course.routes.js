const express = require("express");

const Router = express();

const { createCourse, showAllCourses, getCourseDetails } = require("../Controllers/course.controller");

const { auth, isInstructor } = require("../middlewares/auth");

Router.post("/createCourse", auth, isInstructor, createCourse);

Router.post("/showAllCourses", auth, showAllCourses);

Router.post("/getCourseDetails", auth, getCourseDetails);

module.exports = Router;