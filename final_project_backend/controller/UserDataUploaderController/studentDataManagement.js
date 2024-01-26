const studentData  = require("../../models/userUpload/studentUploads")
const fetchAllUploadedStudentsFile=  async(req, res)=>{
 try {
   const studentDatas = await studentData.findAll();
   if (!studentDatas) {
     return res.sendStatus(400);
   }
   return res.status(200).json(studentDatas);
 } catch (error) {
   console.log(error);
   return res.sendStatus(400);
 }
}
const findStudentByID= async(req, res)=> {
  const { id } = req.params;
  try {
    const student = await studentData.findOne({
      where: {
        id: id,
      },
    });

    if (student) {
      res.status(200).json(student); // Send the student data as a JSON response
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
}
module.exports = {
  fetchAllUploadedStudentsFile,
  findStudentByID,
};



// module.exports = {
//   findStudentByID,
// };