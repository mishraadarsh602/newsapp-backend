// var express = require('express')
const jwt = require("jsonwebtoken");
const Model = require("../models/Users");
//const cookieParser = require("cookie-parser");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Model.findOne({ _id: verified._id,"tokens:token":token });
        if (!rootUser) {
            throw new Error("you have not access to this page")
        }
       
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    } catch (error) {
        console.log("Dont have jwt in cookies");
        res.status(401).send("you dont have permission to this page")
    }



}

module.exports = auth;