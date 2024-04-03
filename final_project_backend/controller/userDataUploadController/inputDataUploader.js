const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const {  sendEmail , generateOTP } = require("../../services/userService");
const  sequelize  = require('../../database/sequelize'); // Adjust the path as necessary
const bcrypt = require('bcrypt');


const submitUserfile = async (req, res) => {
  const { fullName, email, userId, role, status, section } = req.body;
  if (!fullName || !email || !role || !userId || !status || !section) return res.status(400).json({ 'message': 'name, userId, role, status, email, and section are required.' });

  const transaction = await sequelize.transaction();

  try {
    const userDataUploaded = await User.findAll({
      where: {
        userId: userId,
        email: email,
      },
      transaction,
    });

    if (userDataUploaded.length > 0) {
      await transaction.rollback();
      return res.status(403).json({
        message: "the data is already uploaded",
      });
    }

    const otps = generateOTP();
    const hashedPwd = await bcrypt.hash(otps , 10)
    var roles = "";
        if (role=== "teacher" || role === "student") {
          roles = role;
        } else {
          return res.status(400).send("Invalid role");
        }
    
      const newUser = await User.create({
        fullName, email, userId, role:roles, status, password: hashedPwd,
        transaction,
      });
      
      const sectionsArray = Array.isArray(section) ? section : [section];
      
      await Promise.all(sectionsArray.map(async (section) => {
        await Section.create({
          section: section,
          UserinformationId: newUser.id,
          role: newUser.role,
          transaction,
        });
      }));
      
        try {
          await sendEmail(newUser.email, 'OTP for User Login', `Your OTP is: ${otps}`);
          console.log(`OTP sent to ${newUser.email}`);
        } catch (error) {
          console.error(`Error sending OTP to ${newUser.email}: ${error.message}`);
        }
      
      await transaction.commit();

      res.status(201).json({
        message: "user data submitted successfully", newUser
      });
    
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      message: "Error querying the database",
      error: error.message,
    });
  }
};

module.exports = submitUserfile;



