const express = require('express');
const User = require('../../models/auth/user.model');
const { Model } = require('sequelize');
const UserProfile = require('../../models/auth/profile.model');

// Import necessary 
// Define route for creating a profile
const createProfile  = async (req, res) =>  {
    const{ id} = req.params;
    const existingProfile = await UserProfile.findOne({ where: { id: id } });

    if (existingProfile) {
        return res.status(400).json({ message: "Profile already exists" });
    }
    const { 
         university, 
         linkedin,
         github, 
         phoneNumber,
         telegramUsername, 
         gender,
         department, 
         shortBio,
         photoUrl,
             } = req.body;

    try {
    const user = await User.findOne({where: {id: id}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
    const fullName = user.fullName
    const email = user.email
    const userId = user.userId
    const role = user.role

    const profile = await UserProfile.create({
        fullName,
        email,
        userId,
        university,
        linkedin,
        github,
        phoneNumber,
        telegramUsername,
        gender,
        department,
        shortBio,
        photoUrl,
        role
    });
        

    return res.status(201).json({message: "Profile created successfully", existingProfile});

    } catch (error) {
        return res.status(500).json({error: error});
    }
}


const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        // const user
        //     = await User.findOne({where: {userId: id}});
        // if(!user){
        //     return res.status(404).json({message: "User not found"});
        // }
        const profile = await UserProfile.findOne({where: {id: id}});

        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }


        return res.status(200).json({profile});
    }
    catch (error) {
        return res.status(500).json({error: error});
    }
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { university, linkedin, github, phoneNumber, telegramUsername,gender,shortBio,department} = req.body; 
    
    try {
        const
        user = await User.findOne({where: {id: id}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const profile = await UserProfile.findOne({where: {id: id}});
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }
        profile.university = university;
        profile.linkedin = linkedin;
        profile.github = github;
        profile.phoneNumber = phoneNumber;
        profile.telegramUsername = telegramUsername;
        profile.department = department;
        profile.shortBio = shortBio;
        profile.gender = gender;

        
        await profile.save();
        return res.status(200).json({message: "Profile updated successfully", profile});
       
        
    }
    catch (error) {
        return res.status(500).json({error: error});
    }

}
const updateProfilePhoto = async (req, res) => {
    const { id } = req.params;
    const { photoUrl } = req.body;
    try {
        const profile = await UserProfile.findOne({where: {id: id}});
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }
        profile.photoUrl = photoUrl;
        await profile.save();
        return res.status(200).json({message: "Profile photo updated successfully", profile});
    }
    catch (error) {
        return res.status(500).json({error: error});
    }
}




module.exports = {createProfile, getProfile, updateProfile , updateProfilePhoto};