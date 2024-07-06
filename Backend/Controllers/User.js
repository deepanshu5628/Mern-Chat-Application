const User=require("../Models/User");
const SearchUser = async(req, res) => {
    try {
        let owneremail=req.user.email;
        let {query}=req.body;
        // let info=await User.find({email:{$regex:`^${query}`,$options:"i"}})
        // let info=await User.find({$and:[{email:{$ne:owneremail}},{email:{$regex:`^${query}`,$options:"i"}}]})
        let info=await User.find({$and:[{email:{$ne:owneremail}},{email:{$regex:`^${query}`,$options:"i"}}]}).select("name email _id");
        
       
        // send responce 
        res.status(200).json({
            success:true,
            message:"succwaa",
            data:info,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in Search controller",
            data: error,
        })
    }
}

module.exports = SearchUser;