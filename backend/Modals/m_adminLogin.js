// const express=require("express");
import express from 'express'
// const controllers=require("../Controllers/adminLogin");
// const login = express.Router();
import {getlogin} from '../Controllers/adminLogin.js'
// const { query } = require('express-validator');

const login = express.Router()
login.get("/",
    // [
    //     query("s_mobile").notEmpty().withMessage("Mobile No. is Required").isMobilePhone().withMessage("Invalid number"),
    //     query("s_password").notEmpty().withMessage("Password  is Required")
    // ],

    getlogin);

// module.exports=login;

export default login