const exceljs = require("exceljs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const TeacherUploadData =require("../../models/userUpload/teacherUploads")
const teacherData = sequelize.define("TeachersUploadedData", {
  fullName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  section: {
    type: Sequelize.STRING,
  },
});

async function uploadTeachersFile(req, res) {
  try {
    const workbook = new exceljs.Workbook();
    const filePath = req.file.path;
    const uploadedFile = await workbook.xlsx.readFile(filePath);
    const worksheet = uploadedFile.worksheets[0];

    let dataToStore = [];

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      if (rowNumber !== 1) {
        const teacher = {
          fullName: row.values[1],
          email: row.values[2],
          section: row.values[3],
        };
        dataToStore.push(teacher);
      }
    });

    const existingTeachers = await TeacherUploadData.findAll({
      where: {
        email: dataToStore.map((teacher) => teacher.email),
      },
    });
    if (existingTeachers.length > 0) {
      res
        .status(400)
        .send(`${existingTeachers} are already exist in the system`);
    } else {
      await TeacherUploadData.bulkCreate(dataToStore);
      res.send("Data uploaded and stored successfully");
    }
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
}

module.exports = {
  uploadTeachersFile,
  teacherData,
};
