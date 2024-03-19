const exceljs = require("exceljs");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const { sendEmail, generateOTP } = require("../../services/userService");
const bcrypt = require('bcrypt');

const uploadUsersFile = async (req, res) => {
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
        const user = {
          name: row.values[1],
          userId: row.values[2],
          email: email,
          section: row.values[4].toString().split(",").map(section => section.trim()), // Parse section names as an array
          role: row.values[5]
          
        };
        dataToStore.push(user);
      }
    });

    const existingUsers = await User.findAll({
      where: {
        email: dataToStore.map((user) => user.email),
      },
    });

    if (existingUsers.length > 0) {
      return res.status(400).send(`${existingUsers.length} user(s) already exist in the system`);
    } else {
      console.log("Adding new users to the database");

      const otps = dataToStore.map(() => generateOTP()); // Generate OTPs for each user
      const hashedPasswords = await Promise.all(otps.map(otp => bcrypt.hash(otp, 10)));

      const usersToCreate = dataToStore.map((user, index) => {
        return {
          ...user,
          password: hashedPasswords[index] // Store OTP as password
        };
      });
      console.log("step3")

      const createdUsers = await User.bulkCreate(usersToCreate);
      console.log("step5")
      
      // Create sections and associate them with users
      const sectionsToCreate = [];
      createdUsers.forEach((user, index) => {
        console.log("step6",user.id)
        const sections = dataToStore[index].section;
        
        sections.forEach(section => {
          sectionsToCreate.push({
            section: section,
            UserinformationId	: user.id,
            role: dataToStore[index].role
          });
        });
      });

      await Section.bulkCreate(sectionsToCreate);
      console.log("Sections created and associated with users successfully");

      await Promise.all(dataToStore.map(async (user, index) => {
        try {
          await sendEmail(user.email, 'OTP for User Login', `Your OTP is: ${otps[index]}`);
          console.log(`OTP sent to ${user.email}`);
        } catch (error) {
          console.error(`Error sending OTP to ${user.email}: ${error.message}`);
        }
      }));

      console.log("Emails sent successfully");
      return res.send("Data uploaded and stored successfully");
    }
  } catch (error) {
    return res.status(500).send("An error occurred: " + error.message);
  }
}

module.exports = uploadUsersFile;
