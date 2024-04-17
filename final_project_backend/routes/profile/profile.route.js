const express = require("express");
const userProfile = express.Router();
// const activateUser = require("../../controller/userAuthorization/userLogin");

const {createProfile, getProfile, updateProfile} = require("../../controller/Profile/profile");

rofile
userProfile.post("/CreateUserProfile/:id",createProfile);
userProfile.get("/userProfile",getProfile);
userProfile.get("/updateUserProfile/:id",updateProfile);


module.exports = userProfile;
