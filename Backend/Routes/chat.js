const {createChat,getallchats,creategroupChat}=require("../Controllers/Chat");
const express=require("express");
const islogedin = require("../Others/AuthMiddleware");
const router=express.Router();

router.get("/getallchats",islogedin,getallchats);
router.post("/create",islogedin,createChat);
router.post("/creategroup",islogedin,creategroupChat);

module.exports=router;