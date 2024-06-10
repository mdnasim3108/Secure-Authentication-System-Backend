const Users=require("../models/user.model")
module.exports=checkIfuserExists=async(email)=>{
    const user=await Users.findOne({email})
    if(user) return true
    else return false
}