const exceljs = require("exceljs");
const studentData = require("../../models/userUpload/studentUploads");


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
          userID: row.values[2],
          email: row.values[3],
          section: row.values[4],
        };
        dataToStore.push(student);
      }
    });

    
    const existingStudents = await studentData.findAll({
      where: {
        name: dataToStore.map((student) => student.name),
      },
    });
   

    if (existingStudents.length > 0) {
      res.status(400).send("Some students already exist in the system");
    } else {
      console.log("Adding new students to the database");
      await studentData.bulkCreate(dataToStore);
      console.log("Data uploaded and stored successfully");
      res.send("Data uploaded and stored successfully");
    }

  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
}

module.exports = {
  uploadStudentsFile,
};
