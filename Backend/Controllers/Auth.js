const User = require("../Models/User");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//  ----------------------------------------Register----------------------------------------

const Register = async (req, res) => {

   try {
    let { email, password, name, confirmPassword } = req.body;
    // basic validations
    if (!email || !password || !name || !confirmPassword) {
        return res.status(200).json({
            success: false,
            message: "Fill in all details",
        })
    }

    // check if both password and confirm pass are same
    if (password !== confirmPassword) {
        return res.status(200).json({
            success: false,
            message: "Passwords must be same",
        })
    }

    // check if the email is not already registerd
    let userinfo = await User.findOne({ email });
    // if the user exist then show error of do login 
    if (userinfo) {
        return res.status(200).json({
            success: false,
            message: "Email alredy exists",
        })
    }

    // Now the user do not exist hash the password 
    let hashedpass = await bcypt.hash(password, 10);

    // store the info into the db 
    let newuser = await User.create({
        email, name, password: hashedpass, createdAt: Date.now(), updatedAt: Date.now()
    })

    // send the responce 
    res.status(200).json({
        success: true,
        message: "User created Successfully",
        newuser,
    })
   } catch (error) {
    res.status(200).json({
        success: false,
        message: "error in Register controller",
        data: error,
    })
   }

}
//  ----------------------------------------Login----------------------------------------

const Login = async (req, res) => {
    try {
        let { email, password } = req.body;
        // basic validation
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                message: "Fill in all details",
            })
        }

        // check if the user exist or not by verifying email 
        let userinfo = await User.findOne({ email });
        if (!userinfo) {
            return res.status(200).json({
                success: false,
                message: "User doesn't exists",
            })
        }

        // means user is registered now check for passwords
        let iscorrectpass = await bcypt.compare(password, userinfo.password);
        if (!iscorrectpass) {
            return res.status(200).json({
                success: false,
                message: "Inncorrect pass",
            })
        }
        // if we are here means password is correct 
        // generate a token
        const payload = {
            email,
            _id:userinfo._id,
        }
        const token = await jwt.sign(payload, process.env.JWTSECRET)
        userinfo.password=null;
        // send the responce
        res.status(200).json({
            success: true,
            message: "Loged in successfully",
            token,
            userinfo,
        })
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "error in login controller",
            data: error,
        })
    }
}

module.exports = { Login, Register };