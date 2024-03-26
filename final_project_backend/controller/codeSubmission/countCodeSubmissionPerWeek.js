const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const { Sequelize } = require("sequelize");
const User = require("../../models/auth/user.model")

const countCodeSubmissionsForLastWeek = async (req, res) => {
  try {
    const {userId} = req.params
    const { initialDateString }  = req.params;

    const foundUser  = await User.findOne({
      where:{
        id:userId
      }
    })

    if(!foundUser){
      return res.status(400).json({message:"The user is not found"})
    }
    if(foundUser.status === "active"){
    
    const initialDate = new Date(initialDateString);
    // const today = new Date();
    const lastWeek = [];

    // Collect dates for the last week
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(initialDate.getDate() - i);
      lastWeek.push(date.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
    }

    const submissionCounts = await Promise.all(lastWeek.map(async (date) => {
      const count = await codeSubmision.count({
        where: Sequelize.where(
          Sequelize.fn(
            "DATE",
            Sequelize.fn("SUBSTRING_INDEX", Sequelize.col("createdAt"), " ", 1)
          ),
          date
        ),
      });
      return { date, count };
    }));

    return res.status(200).json(submissionCounts);
  }

  else{
    return res.status(403).json({message:"The user is not active"})
  }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to count submissions for last week" });
  }
};

module.exports = countCodeSubmissionsForLastWeek ;
