const Status = require("../../models/codeSubmision/codeStatus")
const sequelize = require("../../database/sequelize");
const User = require("../../models/auth/user.model");


const CountingAllAcceptedSubmittedQuestionsPerSection= async (req, res) => {
    const { userId } = req.params;
  
    try {  
      const foundUser = await User.findOne({
        where:{
          id:userId
        }
      })
      if(!foundUser) {
        return res.status(400).json({message:"The user is not found"})
      }

      const countSubmitted = await Status.findAll({
        attributes: ['section', [sequelize.fn('COUNT', sequelize.literal('DISTINCT section,id')), 'acceptedCount']],
        where:{
            status :"accepted"
        },
        group: ['section'],
        order: [[sequelize.literal('acceptedCount'), 'DESC']],
        raw: true 
    });

      return res.status(200).json({countSubmitted});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


module.exports = CountingAllAcceptedSubmittedQuestionsPerSection