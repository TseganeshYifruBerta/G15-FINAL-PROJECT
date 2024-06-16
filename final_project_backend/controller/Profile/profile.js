const express = require('express');
const User = require('../../models/auth/user.model');


const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
      
        const profile = await User.findOne({where: {id: id}});

        if(!profile){
            return res.status(404).json({message: "User not found"});
        }


        return res.status(200).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}


const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { university, linkedin, github, phoneNumber, telegramUsername,gender,shortBio,department} = req.body; 
    
    try {
        const user = await User.findOne({where: {id: id}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const phoneNumberRegex = /^\+251[79]\d{8}$/;

        if (!phoneNumberRegex.test(phoneNumber)) {
            return res.status(400).json({ message: "Invalid phone number format. Must be +251 followed by 7 or 9, and then 8 digits." });
        }
        const validGenders = ["female", "male"];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender. Must be 'female' or 'male'." });
        }
      
        user.university = university;
        user.linkedin = linkedin;
        user.github = github;
        user.phoneNumber = phoneNumber;
        user.telegramUsername = telegramUsername;
        user.department = department;
        user.shortBio = shortBio;
        user.gender = gender;

        var userId = user.id;
        var userName = user.fullName;
        var userRole = user.role;

        const updatedUser = {
            userId,
            userName,
            userRole,
            university,
            linkedin,
            github,
            phoneNumber,
            telegramUsername,
            department,
            shortBio,
            gender
        }

        
        await user.save();
        return res.status(200).json({message: "user profile updated successfully", updatedUser});
    
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }

}
const updateProfilePhoto = async (req, res) => {
    const { id } = req.params;
    const { photoUrl } = req.body;
    try {
        const profile = await User.findOne({where: {id: id}});
        if(!profile){
            return res.status(404).json({message: "User not found"});
        }
        profile.photoUrl = photoUrl;
        await profile.save();
        return res.status(200).json({ message: "Profile photo updated successfully", profile });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}




module.exports = { getProfile, updateProfile , updateProfilePhoto};
