const express=require("express");
const islogedin = require("../Others/AuthMiddleware");
const {sendmess,chatmessages} = require("../Controllers/Message");
const router=express.Router();

router.post("/create",islogedin,sendmess);
router.get("/:chatid",islogedin,chatmessages);

module.exports =router;