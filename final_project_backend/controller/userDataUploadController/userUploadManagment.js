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
        return res.status(400).json({message: "Not found"});
        }

        return res.status(200).json({userDatas});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });

    }
};
   
              //  fetch all student
const fetchAllStudents= async(req, res)=> {
  try {
      const user = await User.findAll({
      where: {
          role:"student"
      },
      include: [
          {
          model: Section,
          as: "SectionsOfUser",
          
          },
      ],
      });

      if (user) {
      res.status(200).json({user});
      } else {
      res.status(404).send("user not found");
      }
  } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: "Internal server error" });

  }
}
             // fetch all teachers
const fetchAllTeachers= async(req, res)=> {
  try {
      const user = await User.findAll({
      where: {
          role:"teacher"
      },
      include: [
          {
          model: Section,
          as: "SectionsOfUser",
         
          },
      ],
      });

      if (user) {
      res.status(200).json({user});
      } else {
      res.status(404).send("user not found");
      }
  } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: "Internal server error" });

  }
}




          // fetching student using UserId

// const fetchStudentByUserId= async(req, res)=> {
//   const { id } = req.params;
//   try {
//       const user = await User.findOne({
//       where: {
//           id: id,
//           role:"student"
//       },
//       include: [
//           {
//           model: Section,
//           as: "SectionsOfUser",
          
//           },
//       ],
//       });

//       if (user) {
//       res.status(200).json({user});
//       } else {
//       res.status(404).send("user not found");
//       }
//   } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({ error: "Internal server error" });

//   }
// }
//          // teacher detail by id 
// const fetchTeacherByUserId= async(req, res)=> {
//   const { id } = req.params;
//   try {
//       const user = await User.findOne({
//       where: {
//           id: id,
//           role:"teacher"
//       },
//       include: [
//           {
//           model: Section,
//           as: "SectionsOfUser",
//           },
//       ],
//       });

//       if (user) {
//       res.status(200).json({user});
//       } else {
//       res.status(404).send("user not found");
//       }
//   } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({ error: "Internal server error" });

//   }
// }

          
                // updating user data 
const updateUser = async (req, res) => {
    const { fullName, email, userId, role, status, sections } = req.body; 
    const {id} = req.params

    const transaction = await sequelize.transaction(); 
  
    try {

      const user = await User.findOne({ where: { id } });
      if (!user) {
        await t.rollback(); 
        return res.status(404).json({ message: 'User not found' });
      }
  
     
      await User.update(
        { fullName, email, userId, role, status },
        { where: { id: id }, transaction } 
      );

      const sectionsArray = Array.isArray(sections) ? sections : [sections];
      if (sectionsArray) {
        await Promise.all(
          sectionsArray.map(async (section) => {
           
            const sectionId = section.id;


            await Section.update(
              { section: section.section },
              { where: { UserinformationId: id, id: sectionId }, transaction }
            );
          })
        );
      }
      const updatedTestCases = await Section.findAll({ where: { UserinformationId: id } });
      


      
      // await Section.update({ section: section }, { where: {id:section., UserinformationId: id }, transaction: t });
  
      await transaction.commit();
  
      const updatedUser = await User.findOne({
         where: { id }, 
         include: [{ model: Section, as: 'SectionsOfUser' }]
        });
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
      console.error(error);
      await transaction.rollback(); 
      return res.status(500).json({ message: 'An error occurred while updating user data' });
    }
  };

  const AddSections = async (req, res) => {
    const { sections, userId } = req.body;
    let transaction;
  
    try {
      if(!sections ) {
        return res.status(400).json({ error: 'Section is required' });
      }
      transaction = await sequelize.transaction();
      const userFound = await User.findOne({ where: { id: userId }, transaction });
  
      if (!userFound) {
        throw new Error("User is Not Found"); 
      }
  
      const sectionsArray = Array.isArray(sections) ? sections : [sections];
      let errors = [];
  
      for (const section of sectionsArray) {
        const sectionFound = await Section.findOne({
          where: { section: section, UserinformationId: userId },
          transaction,
        });
        if (sectionFound) {
          errors.push(`Section ${section} already exists`);
        } else {
          await Section.create({
            section: section,
            role: userFound.role,
            UserinformationId: userId,
          }, { transaction });
        }
      }
  
      if (errors.length > 0) {
        await transaction.rollback();
        return res.status(400).json({ message: errors.join(", ") });
      } else {
        await transaction.commit();
        return res.status(201).json({
          message: "Section submitted successfully",
          sections: sectionsArray, // Adjust based on what you need to return
        });
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.status(500).json({
        message: "Error adding sections",
        error: error.message,
      });
    }
  };
  

  const DeleteSections = async (req, res) => {
    const { sectionId } = req.params;
  
    try {
      transaction = await sequelize.transaction();
      const sectionFound = await Section.findOne({
        where: {
          id: sectionId
        },
        transaction
      })
      if(!sectionFound){
          return res.status(400).json({message:"section is Not Found"})
      }
      await Section.destroy({ where: { id: sectionId }, transaction });
  
    

      await transaction.commit();
      
  
        res.status(201).json({
          message: "section deleted successfully",
          
        });
 
  
    } catch (error) {
      await transaction.rollback();
      res
        .status(500)
        .json({
          message: "Error deleting sections",
          error: error.message,
        });
    }
  };
const deleteUser = async (req,res)=>{
  const { id } = req.params;
  const transaction = await sequelize.transaction(); 

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    await Section.destroy( { where: { UserinformationId: id }, transaction });



    await user.destroy({  where: { id: id },transaction });
    await transaction.commit();

    return res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: "Failed to delete user" });
    
  }

}


module.exports = {fetchAllStudentBasedOnSection,fetchAllStudents,fetchAllTeachers,deleteUser, updateUser,DeleteSections, AddSections }