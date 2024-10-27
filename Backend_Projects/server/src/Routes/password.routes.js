const express = require("express")
const Router = express.Router();

const { restPasswordToken, resetPassword } = require("../Controllers/resetPassword");
const { auth } = require("../middlewares/auth");


Router.post("/resetPassword", auth, restPasswordToken);
Router.post("/update-password", auth, resetPassword);


module.exports = Router;