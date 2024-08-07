const mongosee=require("mongoose");

let connectdb=async ()=>{
    // await mongosee.connect("mongodb+srv://d2810202:7tWqoFTLP0avzf6U@chatapplications.hcx5ppg.mongodb.net/?retryWrites=true&w=majority&appName=ChatApplications");
    await mongosee.connect("mongodb://localhost:27017/chai");
}

let startdb=()=>{
    connectdb()
    .then(()=>console.log("connected to db successfully"))
    .catch((error)=>console.log("error in connecting to db",error));
}
module.exports=startdb;