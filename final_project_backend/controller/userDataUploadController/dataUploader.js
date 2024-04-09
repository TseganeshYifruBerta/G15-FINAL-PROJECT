const exceljs = require("exceljs");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const { sendEmail, generateOTP } = require("../../services/userService");
const bcrypt = require('bcrypt');
const  sequelize  = require("../../database/sequelize");
const uploadUsersFile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const workbook = new exceljs.Workbook();
    const filePath = req.file.path;
    const uploadedFile = await workbook.xlsx.readFile(filePath);
    const worksheet = uploadedFile.worksheets[0];

    let dataToStore = [];
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      if (rowNumber !== 1) {
        const email =
          typeof row.values[3] === "object"
            ? row.values[3].text
            : row.values[3];
        var role = "";
        if (row.values[5] === "teacher" || row.values[5] === "student") {
          role = row.values[5];
        } else {
          return res.status(400).json({message:"file with  Invalid role"});
        }
        // const role = row.values[5];
        const user = {
          fullName: row.values[1],
          userId: row.values[2],
          email: email,
          section: row.values[4].toString().split(",").map(section => section.trim()), // Parse section names as an array
          role : role,
          status: row.values[6],
            
        };
        dataToStore.push(user);
      }
    });

    const existingUsers = await User.findAll({
      where: {
        email: dataToStore.map((user) => user.email),
      },
    }, { transaction });

    if (existingUsers.length > 0) {
      return res.status(400).json({message:`${existingUsers.length} user(s) already exist in the system`});
    } else {

      const otps = dataToStore.map(() => generateOTP()); // Generate OTPs for each user
      const hashedPasswords = await Promise.all(otps.map(otp => bcrypt.hash(otp, 10)));

      const usersToCreate = dataToStore.map((user, index) => {
        return {
          ...user,
          password: hashedPasswords[index] // Store OTP as password
        };
      });

      const createdUsers = await User.bulkCreate(usersToCreate, { transaction });

     
      // Create sections and associate them with users
      const sectionsToCreate = [];
      createdUsers.forEach((user, index) => {

        const sections = dataToStore[index].section;
        
        sections.forEach(section => {
          sectionsToCreate.push({
            section: section,
            UserinformationId	: user.id,
            role: dataToStore[index].role
          });
       
        });
      });
      
      await Section.bulkCreate(sectionsToCreate, { transaction });
      // var newer = [];
      // createdUsers.forEach((user, index) => {
      //   ids = user.id;
      //   newer.push(ids );
        
      // });
      // var answer = []
      // const g = newer.map((user) => user.id);
      // console.log("newer", g);
      // var newerrr = await User.findAll({
      //   where: {  
      //     id: newer.map((user) => user.id),
      //   },
      //   include: {
      //     model: Section,
      //     as: 'SectionsOfUser'
      //   }
      //   // newer.push({user , section});
      // });
      // console.log("Sections associated with users:", newerrr);
      // answer.push(newerrr);
    

      
      // const ne = await Section.findAll({
      //  where: {
      //     UserinformationId: createdUsers.map((user) => user.id),
      //   },
      // });

      // const newer = ne.map((section) => section); // Convert Sequelize objects to plain objects

      // const sec = await User.findAll({
       
      //   include: {
      //     model: Section,
      //     as: 'sections'

      //   }
      // });

      // const userSections = await Section.findAll({
      //   where: {
      //     UserinformationId: createdUsers.map((user) => user.id),
      //   },
      // });


      // console.log("Sections associated with users:", newer);


      

      console.log("Sections created and associated with users successfully");

      await Promise.all(dataToStore.map(async (user, index) => {
        try {
          await sendEmail(user.email, 'OTP for User Login', `Your OTP is: ${otps[index]}`,{ transaction });
          console.log(`OTP sent to ${user.email}`);
        } catch (error) {
          console.error(`Error sending OTP to ${user.email}: ${error.message}`);
        }
      }));

      console.log("Emails sent successfully");
      await transaction.commit();
      
      return res.status(200).json({message:"Data uploaded and stored successfully" ,createdUsers });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({error: error.message});
  }
}

module.exports = uploadUsersFile;
