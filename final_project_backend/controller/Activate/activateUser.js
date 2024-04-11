const User = require('../../models/auth/user.model') 
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

    
    res.json({ message: 'User is activated' });
    } catch (error) {
       
        return res.status(500).json({error:error})
    }
    
}
module.exports = activateUser;