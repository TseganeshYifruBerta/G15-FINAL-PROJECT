const e = require('express');
const User = require('../../models/auth/user.model');
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

const changePassword = async (req, res) => {
  const { userId, newPassword , oldPassword } = req.body;
  const user = await User.findOne({ where: 
    { id:userId } 



})
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if ( bcrypt.compare(oldPassword.toString(), user.password))
   {
    try {
      const hashedPwd = await bcrypt.hash(newPassword.toString(), 10);
      user.password = hashedPwd;
      await user.save();
      return res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  else{
    return res.status(401).json({ message: "Old password is incorrect" });
  }



}

module.exports = changePassword;