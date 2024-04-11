const User = require('../../models/auth/user.model') 
const bcrypt = require('bcrypt');
const { use } = require('../../routes/exam/examRoute');
const activateUser = async (req, res) => {
    const { userId } = req.body;
    console.log("jjjjjj")
    try {
        const user = await User.findOne({ where: { id:userId } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid userId' });
    }
        
    user.status = 'active';
    user.loginAttempt = 0;
    await user.save();

    const generateRandomPassword = () =>
    {
        const min = 100000;
        const max = 999999;
        const randomPassword = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomPassword;
    }
    const newPassword = generateRandomPassword();
    const hashedPwd = await bcrypt.hash(newPassword.toString(), 10);
    user.password = hashedPwd;
    await user.save();
    
    res.json({  newPassword , message: 'User activated successfully' });
    } catch (error) {
       
        return res.status(500).json({error:error})
    }
}
module.exports = activateUser;