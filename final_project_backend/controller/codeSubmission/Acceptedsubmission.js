const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Status = require("../../models/codeSubmision/codeStatus");
const User = require("../../models/auth/user.model")
  
                //  get all accepted submissions using user id
const getAllAcceptedSubmissionsByUserId= async (req, res) => { 
  const { userId } = req.params 
  
  try {
    const foundUser = await User.findOne({
      where:{
        id :userId
      }
    })
    if(!foundUser){
      return res.status(400).json({message:"The user is not found"})
    }

    if(foundUser.status === "active"){

      const submissions = await codeSubmision.findAll();
      let allAcceptedSubmissions = [];
      for (const submission of submissions) {
        const status = await Status.findOne({


          where: {  submittedCodeId: submission.id, status: 'Accepted' }

        });
        if (status) {
          allAcceptedSubmissions.push(submission);
        }}
      return res.status(200).json(allAcceptedSubmissions);
    }
    else{
      return res.status(403).json({message:"The User is not active"})
    }

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }


}

module.exports =  getAllAcceptedSubmissionsByUserId ; 