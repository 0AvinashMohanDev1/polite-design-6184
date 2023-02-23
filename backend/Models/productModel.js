const mongoose=require("mongoose");



const userSchema=mongoose.Schema({
    "url":{type:url,required:true},
    "title":{type:String,required:true},
    "rating":{type:Number,required:true},
    "price":{type:Number,required:true},
    "category":{type:String,required:true},
    "details":{type:String,required:true}
})

const UserModel=mongoose.model("ProjectProduct",userSchema);

module.exports={
    UserModel
}