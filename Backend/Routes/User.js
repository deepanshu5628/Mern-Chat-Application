const express=require("express");
const { Login, Register } = require("../Controllers/Auth");
const router=express.Router();

router.post("/register",Register);
router.post("/login",Login)

module.exports=router;