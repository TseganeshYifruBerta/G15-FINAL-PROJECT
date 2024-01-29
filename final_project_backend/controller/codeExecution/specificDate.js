const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const countSubmissionsForDate = async (req , res) => {
    const {date} = req.params
  try {
    const submissionCounts = await codeSubmision.count({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('createdAt'), ' ', 1)),
        date
      ),
    });
    return res.status(200).json(submissionCounts);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to count submissions for date');
  }
};
module.exports(countSubmissionsForDate)
const countSubmissionsForDateByUserId = async (req, res) => {
  const { userId, date } = req.params;
  try {
    const submissionCounts = await codeSubmision.count({
      where: Sequelize.where(
        Sequelize.and(
          { userId: userId },
          Sequelize.fn('DATE', Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('createdAt'), ' ', 1))),
        
        date
      ),
    });
    return res.status(200).json(submissionCounts);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to count submissions for date');
  }
};
module.exports(countSubmissionsForDateByUserId)
