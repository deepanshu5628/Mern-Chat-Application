const jwt=require("jsonwebtoken");
async function islogedin(req,res,next){
    try {
        let tok=req.headers.authorization;
        if(!tok){
            return res.status(200).json({
                success:false,
                message:"Token is missing",
            })
        }
        let  token=tok.split("Bearer ")[1];
        // verify this token
        let payload;
        try {
             payload=jwt.verify(token,process.env.JWTSECRET);
        } catch (error) {
            return res.status(200).json({
                success:false,
                message:"Invalid token",
            })
        }
        req.user=payload;
        next();
    } catch (error) {
        res.status(200).json({
            success:false,
            message:"error",
            data:error.message,
        })
    }
}

module.exports=islogedin;