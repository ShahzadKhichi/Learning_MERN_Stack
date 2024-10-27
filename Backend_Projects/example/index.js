const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
console.log(port);

app.listen(port, () => {
  console.log(`Sever started At port ${port}`);
});
app.get("/", (req, res) => {
  //res.send("You are at Home");
  res.json({ name: "shahzad", age: 21 });
});

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/khan")
  .then(console.log("connection Sucessfull"))
  .catch((err) => console.log("connection failed"));

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const todo = mongoose.model("todo", schema);
app.post("/login", async (req, res) => {
  const { name, age } = req.body;
  const response = await todo.create({ name, age });
  //console.log(response);

  res.status(200).json({
    success: true,
    data: response,
    message: "success full ",
  });
});
