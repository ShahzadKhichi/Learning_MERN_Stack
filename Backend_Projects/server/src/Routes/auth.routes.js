const express = require("express");

const Router = express.Router();

const { sendOTP, signUp, logIn, deleteAccount } = require("../Controllers/Auth.controllers");

const { auth } = require("../middlewares/auth");


Router.post("/sendOTP", sendOTP);

Router.post("/signUP", signUp);

Router.post("/logIn", logIn);

Router.post("/deleteAcount", auth, deleteAccount);










module.exports = Router;
