const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Status = require("../../models/codeSubmision/codeStatus")

const countAcceptedSubmissions = async (req, res) => {
    try {
      const submissions = await codeSubmision.findAll();
      let totalCount = 0;
  
      for (const submission of submissions) {
        const status = await Status.findOne({
          where: {
            submittedCodeId: submission.id,
            status: 'Accepted'
          }
        });
  
        if (status) {
            totalCount++;
        }
      }
  
      return res.status(200).json(totalCount);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = 
    countAcceptedSubmissions
  