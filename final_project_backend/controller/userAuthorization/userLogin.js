const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/auth/user.model');
const Section = require('../../models/auth/section.model');
const login = async (req, res) => {
    const { userId, password } = req.body;

    const user = await User.findOne({ where: { userId } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid userId or password' });
    }
    const section = await Section.findAll({ where: { UserinformationId: user.id } });
    const sectionValues = section.map(sec => sec.section);
    
    const token = jwt.sign(
        {
            userId: user.useId,
            id: user.id,
            email: user.email,
            role: user.role,
            section: sectionValues,
        },
        process.env.ACCESS_TOKEN_SECRET, 
    );
    const decodedToken = jwt.decode(token);
    console.log("decodedToken",decodedToken)
  
    res.json({ token });
};

module.exports =  login ;
