const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require("./routes/auth/userRoute.js");
const executionRouter = require("./routes/code/code.js");
const examRouters =require("./routes/exam/examRoute")
const dataUploadRouters = require("./routes/userDataUploader/userData");
const sequelize = require("./database/sequelize.js");
const questionRouters = require("./routes/questionRoute/questionRoute.js");
const codeSubmissionRouter = require("./routes/codeSubmission/codeSubmissionRoute.js")
const verifyJWT = require("./middleware/verifyJWT.js")
const checkUserStatus = require("./middleware/userStatus.js")
const seedAdminData = require("./models/auth/seed.js");
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
seedAdminData();

app.use(cors());
app.use(cookieParser());

// Routes related to Authentication
app.use("/", routes);
app.use(verifyJWT)
app.use(checkUserStatus)



//  Routes related to Question
app.use("/question", questionRouters);

// Routes related to Execution
app.use("/execution", executionRouter);

// route related to code submission
app.use("/codeSubmission", codeSubmissionRouter);


// Routes related to DataUpload
app.use("/upload", dataUploadRouters); 

//  Routes related to Exam
app.use("/exam", examRouters); 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));