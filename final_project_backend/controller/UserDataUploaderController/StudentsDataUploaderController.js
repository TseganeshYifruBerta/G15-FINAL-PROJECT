const exceljs = require("exceljs");
const StudentUploadData = require("../../models/userUpload/studentUploads");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const studentData = sequelize.define("StudentsUploadedData", {
  name: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  section: {
    type: Sequelize.STRING,
  },
});

async function uploadStudentsFile(req, res) {
  try {
    const workbook = new exceljs.Workbook();
    const filePath = req.file.path;
    const uploadedFile = await workbook.xlsx.readFile(filePath);
    const worksheet = uploadedFile.worksheets[0];

    let dataToStore = [];

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      if (rowNumber !== 1) {
        const student = {
          name: row.values[1],
          userId: row.values[2],
          email: row.values[3],
          section: row.values[4],
        };
        dataToStore.push(student);
      }
    });
    const existingStudents = await StudentUploadData.findAll({
      where: {
        name: dataToStore.map((student) => student.name),
      },
    });
    if (existingStudents.length > 0) {
      res
        .status(400)
        .send(`${existingStudents} are already exist in the system`);
    } else {
      await StudentUploadData.bulkCreate(dataToStore);
      res.send("Data uploaded and stored successfully");
    }
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
}

module.exports = {
  uploadStudentsFile,
  studentData,
};
