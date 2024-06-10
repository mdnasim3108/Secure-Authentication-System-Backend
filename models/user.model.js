let mongoose = require('mongoose')
let userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String}
});
module.exports=Users=mongoose.model("Users",userSchema);