const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus");
const User = require("../../models/auth/user.model");
const TestCase = require("../../models/question_testcase_submission/testCase");



const getNumberOfAllQuestion = async(req,res) =>{
      try{
        const question = await Question.findAll();
        const count = question.length;
        return res.status(200).json(count)
       
      } catch(error){
       console.log(error);
       return res.sendStatus(400);
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
    
    
    return res.status(200).json(questionWithTestcase)
  }
  else{
    return res.status(400).json({message:"The user is not active"})
  }
   
  } catch(error){
   console.log(error);
   return res.sendStatus(400);
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
  return res.status(200).json(count)
}
else{
  return res.status(400).json({message:"The user is not active"})
}
  
} catch(error){
  console.log(error);
  return res.sendStatus(400);
}
};



const getAllQuestions = async (req, res) => {
  try {
    const {userId} = req.params
    const findUser = await User.findOne({
      where:{
        id:userId 
      }
    });
    if (!findUser){
      return res.status(400).json({message:"The user is not found"})
    }
    if(findUser.status === 'active'){
      const questionWithTestcase = await Question.findAll({
        
        include: [
          {
            model: TestCase,
            as: 'TestCases',
            attributes: ['input', 'output'],
            
          }
        ]
      });
      return res.status(200).json(questionWithTestcase);
  }
  else{
    return res.status(400).json({message:"The user is not active"})
  }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


module.exports = { getAllQuestions,  getNumberOfAllQuestion , getAllQuestionsCreatedByTeacher,getNumberOfAllQuestionsCreatedByTeacher};
