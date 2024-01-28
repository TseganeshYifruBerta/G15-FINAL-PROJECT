const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require("./routes/auth/userRoute.js");
const executionRouter = require("./routes/code/code.js");

const dataUploadRouters = require("./routes/userDataUploader/userData");
const sequelize = require("./database/sequelize.js");
const questionRouters = require("./routes/questionRoute/questionRoute.js");
const Teacher = require("./models/registration/user/teachersModel.js");
const Student = require("./models/registration/user/studentsModel.js");
dotenv.config({
  path: "./config.env",
});
const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

async function initializeDatabase() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

initializeDatabase();
app.use(cors());
app.use(cookieParser());

// Routes related to Authentication
app.use("/", routes);

//  Routes related to Question
app.use("/question", questionRouters);

// Routes related to Execution
app.use("/execution", executionRouter);

// Routes related to DataUpload
app.use("/upload", dataUploadRouters);  
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));