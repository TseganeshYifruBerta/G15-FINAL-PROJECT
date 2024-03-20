const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const { Op } = require("sequelize");
const  sequelize  = require('../../database/sequelize'); // Adjust the path as necessary


          // fething all uploaded user datas
const fetchAllStudentBasedOnSection = async (req, res) => {
  const { id } = req.params;
    try {
        const teachersSections = await Section.findAll({
          where: {
            role: "teacher" ,
            UserinformationId :id
          },
        });   
        
        const userDatas = await User.findAll({
          where: {
            role: 'student'
          },
          include: [
            {
              model: Section,
              as: 'SectionsOfUser',
              attributes: ['section'],
              where: {
                section: {
                  [Op.in]: teachersSections.map(section => section.section)
                }
              }
            }
          ]
        });

        if (!userDatas) {
        return res.sendStatus(400);
        }

        return res.status(200).json(userDatas);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};



          // fetching student using UserId

const findStudentByUserId= async(req, res)=> {
  const { id } = req.params;
  try {
      const user = await User.findOne({
      where: {
          id: id,
      },
      include: [
          {
          model: Section,
          as: "SectionsOfUser",
          attributes: ["section"],
          },
      ],
      });

      if (user) {
      res.status(200).json(user);
      } else {
      res.status(404).send("user not found");
      }
  } catch (error) {
      res.status(500).send("An error occurred: " + error.message);
  }
}

          
                // updating user data 
const updateUser = async (req, res) => {
    const { name, email, userId, role, status, section } = req.body; 
    const {id} = req.params

    const t = await sequelize.transaction(); 
  
    try {

      const user = await User.findOne({ where: { id } });
      if (!user) {
        await t.rollback(); 
        return res.status(404).json({ message: 'User not found' });
      }
  
     
      await User.update(
        { name, email, userId, role, status },
        { where: { id: id }, transaction: t } 
      );
      
      await Section.update({ section: section }, { where: { UserinformationId: id }, transaction: t });
  
      await t.commit();
  
      const updatedUser = await User.findOne({ where: { id } });
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      await t.rollback(); 
      return res.status(500).json({ message: 'An error occurred while updating user data' });
    }
  };







    

module.exports = {fetchAllStudentBasedOnSection, updateUser ,findStudentByUserId }