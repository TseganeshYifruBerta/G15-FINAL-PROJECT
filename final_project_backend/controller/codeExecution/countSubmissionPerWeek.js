const codeSubmission = require("../../models/codeSubmission/codeSubmission");
const { Sequelize } = require("sequelize");

const countSubmissionsForLastWeek = async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = [];

    // Collect dates for the last week
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      lastWeek.push(date.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
    }

    const submissionCounts = await Promise.all(lastWeek.map(async (date) => {
      const count = await codeSubmission.count({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to count submissions for last week" });
  }
};

module.exports = { countSubmissionsForLastWeek };
