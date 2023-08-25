// import News from "../models/News.js";
// import fetch from "node-fetch";
const Users = require("../models/Users");
const auth = require("../middleware/auth")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserController = {

    signupUser: async (req, res) => {
        const { name, email, phone, password } = req.body;
        const result = await Users.findOne({ email: email });
        if(result) {
            res.status(400).send({
                status: "eror",
                message: "User already registered with this email",
                
            });
        } else {

            try {
                const user = new Users({
                    name, email, phone, password
                });
                const token = await user.generateAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                })
                console.log("token", token);

                const result = await user.save();
                res.status(200).send({
                    status: "ok",
                    message: "User created successfully",
                    result
                });
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    status: "eror",
                    message: "Something went wrong"
                });
            }
        }
    },
    getLogout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((element) => {
                return element.token !== req.token;
            })
            res.clearCookie("jwt");
            await req.user.save();

            res.render("login");
        } catch (error) {
            console.log("This error is  " + error);
        }
    },
    checkLogin: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            console.log(req.body)
            const result = await Users.findOne({ email: email });
            console.log("result",result);
            if(result){
                const validPass = await bcrypt.compare(password, result.password);

            const token = await result.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            })
            console.log("token", token);

            if (validPass) {
                res.status(200).json({
                    status: "ok",
                    message: "You have successfully logged in"
                });
            } else {
                res.status(400).json({
                    status: "error",
                    message: "Invalid Credentials"
                });
            }
            } else {
                res.status(400).json({
                    status: "error",
                    message: "Invalid Credentials"
                });
            }
        } catch (error) {
            console.log(error);
        }
    }



}

module.exports = UserController;