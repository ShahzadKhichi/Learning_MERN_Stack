const express = require("express")
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const dbConnect = require("./DB/dbConnect");
const fileUploader = require("express-fileupload");

//routes
const userRoutes = require("./Routes/auth.routes");
const categoryRoutes = require("./Routes/category.routes");
const profileRoutes = require("./Routes/profile.routes")
const courseRoutes = require("./Routes/course.routes");
const passwordRoutes = require("./Routes/password.routes");
const sectionRoutes = require("./Routes/section.routes");
const subSectionRoutes = require("./Routes/subSection.routes");

app.use(express.json());

app.use(cookieParser());

app.use(fileUploader());


//use routes
app.use(userRoutes);
app.use(categoryRoutes);
app.use(profileRoutes);
app.use(courseRoutes);
app.use(passwordRoutes);
app.use(sectionRoutes);
app.use(subSectionRoutes);


dbConnect();



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

