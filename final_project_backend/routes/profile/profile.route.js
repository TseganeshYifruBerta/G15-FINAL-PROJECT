const express = require("express");
const userProfile = express.Router();
// const activateUser = require("../../controller/userAuthorization/userLogin");

const {createProfile, getProfile, updateProfile,updateProfilePhoto} = require("../../controller/Profile/profile");

userProfile.post("/CreateUserProfile/:id",createProfile);
userProfile.get("/getUserProfile/:id",getProfile);
userProfile.put("/updateUserProfile/:id",updateProfile);
userProfile.put("/updateUserProfilePhoto/:id",updateProfilePhoto);


module.exports = userProfile;
