const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/auth/user.model');

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        console.log("/////",user)
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role 
        },
        process.env.ACCESS_TOKEN_SECRET, 
    );
  
    res.json({ token });
};

module.exports =  login ;
