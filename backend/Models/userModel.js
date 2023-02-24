const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    "name":{type:String,required:true},
    "email":{type:String,required:true},
    "age":{type:Number,required:true},
    "password":{type:String,required:true},
    "gender":{type:String,required:true}
})

const UserModel=mongoose.model("ProjectUser",userSchema);

module.exports={
    UserModel
}