const express=require("express");
const SearchUser = require("../Controllers/User");
const islogedin = require("../Others/AuthMiddleware");
const router=express.Router();

router.post("/searchuser",islogedin,SearchUser);

module.exports=router;