const exceljs = require("exceljs");
const TeacherUploadData =require("../../models/userUpload/teacherUploads")

async function uploadTeachersFile(req, res) {
  try {
    const workbook = new exceljs.Workbook();
    const filePath = req.file.path;
    const uploadedFile = await workbook.xlsx.readFile(filePath);
    const worksheet = uploadedFile.worksheets[0];

    let dataToStore = [];

    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      if (rowNumber !== 1) {
        const email =
          typeof row.values[2] === "object"
            ? row.values[2].text
            : row.values[2];
        const teacher = {
          fullName: row.values[1],
          email: email,
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

};
