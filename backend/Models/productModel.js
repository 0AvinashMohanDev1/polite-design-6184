const mongoose=require("mongoose");



const productSchema=mongoose.Schema({
    "url":{type:String,required:true},
    "title":{type:String,required:true},
    "rating":{type:Number,required:true},
    "price":{type:Number,required:true},
    "category":{type:String,required:true},
    "details":{type:String,required:true},
    "count":{type:Number,required:true}
})

const ProductModel=mongoose.model("ProjectProduct",productSchema);

module.exports={
    ProductModel
}