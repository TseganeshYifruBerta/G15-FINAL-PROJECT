const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus");
const User = require("../../models/auth/user.model");
const TestCase = require("../../models/question_testcase_submission/testCase");



const getNumberOfAllQuestion = async(req,res) =>{
      try{
        const question = await Question.findAll();
        const count = question.length;
        return res.status(200).json({count})
       
      } catch(error){
       console.log(error);
       return res.status(500).json({ error: "Internal Server Error" });

      }
};


             //AllQuestionsCreatedByTeacher 
const getAllQuestionsCreatedByTeacher = async(req,res) =>{
  try{
    const {teacherId} = req.params
    const teacherfound = await User.findOne({
      where:{
        id:teacherId
      }
    })
    if (!teacherfound){
       return res.status(400).json({message:"The user is not found"})
    }
    if(teacherfound.status === 'active'){
   
    const questionWithTestcase = await Question.findAll({
      where: {
        teacherId: teacherId
      },
      include: [
        {
          model: TestCase,
          as: 'TestCases',
          attributes: ['input', 'output'],
          
        }
      ]
    });
    
    
    return res.status(200).json({questionWithTestcase})
  }
  else{
    return res.status(400).json({message:"The user is not active"})
  }
   
  } catch(error){
   console.log(error);
   return res.status(500).json({ error: "Internal Server Error" });
   
  }
};

        //AllNumberOfAllQuestionsCreatedByTeacher 

const getNumberOfAllQuestionsCreatedByTeacher = async(req,res) =>{
try{
  const {teacherId} = req.params
  const teacherfound = await User.findOne({
    where:{
      id:teacherId
    }
  })
  if (!teacherfound){
    res.status(400).json({message:"The user is not found"})

  }

  if(teacherfound.status === 'active'){
  const questioncreated = await Question.findAll({ 
    where: {
      teacherId: teacherId
    }
  }
  );
  const count = questioncreated.length;
  return res.status(200).json({count})
}
else{
  return res.status(400).json({message:"The user is not active"})
}
  
} catch(error){
  console.log(error);
  return res.status(500).json({ error: "Internal Server Error" });

}
};



const getAllQuestions = async (req, res) => {
  try {
   
      const questionWithTestcase = await Question.findAll({
        
        include: [
          {
            model: TestCase,
            as: 'TestCases',
            attributes: ['id','input', 'output'],
            
          }
        ]
      });
      return res.status(200).json({questionWithTestcase});
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });


  }
};


module.exports = { getAllQuestions,  getNumberOfAllQuestion , getAllQuestionsCreatedByTeacher,getNumberOfAllQuestionsCreatedByTeacher};
