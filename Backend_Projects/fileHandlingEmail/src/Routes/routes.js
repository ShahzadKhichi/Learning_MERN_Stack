const express = require("express");

const router = express.Router();

const fileUpload = require("../Controllers/fileUpload");

router.post("/upload", fileUpload);


module.exports = router;