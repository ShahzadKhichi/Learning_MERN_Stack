const express = require("express");
const router = express.Router();
const createStudent = require("../controllers/createStudent");
const getStudents = require("../controllers/getAllStudents")
const deleteId = require("../controllers/deleteId");
const updateId = require("../controllers/updateAtId");
router.post("/create", createStudent);
router.get("/getAll", getStudents);
router.put("/updateId/:id", updateId);
router.delete("/deleteId/:id", deleteId);

module.exports = router;