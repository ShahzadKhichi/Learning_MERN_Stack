const express = require("express");
const router = express.Router();

const signUP = require("../Controllers/signUP");
const login = require("../Controllers/login")
const { isStudent, isAdmin, auth } = require("../MiddleWares/auth");
router.post("/signUP", signUP);
console.log("routes");

router.post("/login", login);
router.get("/Student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are Student"
    })
});
router.get("/Admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are an Admin"
    })
});





module.exports = router;