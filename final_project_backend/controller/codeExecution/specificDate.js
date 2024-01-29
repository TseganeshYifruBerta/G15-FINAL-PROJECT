const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const countSubmissionsForDate = async (req, res) => {
  const { date } = req.params;
  try {
    const submissionCounts = await codeSubmision.count({
      where: Sequelize.where(
        Sequelize.fn(
          "DATE",
          Sequelize.fn("SUBSTRING_INDEX", Sequelize.col("createdAt"), " ", 1)
        ),
        date
      ),
    });
    return res.status(200).json(submissionCounts);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to count submissions for date");
  }
};



const countSubmissionsForDateByUserId = async (req, res) => {
  const { userId, date } = req.params;const codeSubmision = require("../../models/codeSubmision/codeSubmision");

  const { Op } = require("sequelize");
  
  const countSubmissionsForDateByUserId = async (req, res) => {
    const { userId, date } = req.params;
    try {
      const submissionCount = await codeSubmision.count({
        where: {
          userId: userId,
          createdAt: {
            [Op.gte]: new Date(date), // Greater than or equal to the start of the date
            [Op.lt]: new Date(
              new Date(date).setDate(new Date(date).getDate() + 1)
            ), // Less than the start of the next date
          },
        },
      });
      return res.status(200).json(submissionCount);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to count submissions for date");
    }
  };
  
  module.exports = countSubmissionsForDateByUserId;
  try {
    const submissionCount = await codeSubmision.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: new Date(date), // Greater than or equal to the start of the date
          [Op.lt]: new Date(
            new Date(date).setDate(new Date(date).getDate() + 1)
          ), // Less than the start of the next date
        },
      },
    });
    return res.status(200).json(submissionCount);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to count submissions for date");
  }
};
module.exports = { countSubmissionsForDateByUserId, countSubmissionsForDate };