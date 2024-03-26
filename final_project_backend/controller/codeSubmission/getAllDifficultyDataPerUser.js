const Difficulty = require("../../models/codeSubmision/difficultyCounter");
const User = require("../../models/auth/user.model");

const getAllDifficultyDataPerUser = async (req, res) => {
  const {id} = req.params;
   
  try {
    const foundUser = await User.findOne({
      where:{
        id:id
      }
    })
    if(!foundUser) {
      return res.status(400).json({message:"The user is not found"})
    } 

    const difficultyDataPerUser = await Difficulty.findAll({
      where: {
        userId: id,
      },
    });
  
    return res.status(200).json({difficultyDataPerUser});
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};



module.exports = getAllDifficultyDataPerUser;
