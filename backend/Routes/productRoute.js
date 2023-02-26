const express=require("express");
const {ProductModel}=require("../Models/productModel");
const {cartModel}=require("../Models/productModel");
require("dotenv").config();
const {authentication}=require("../Middleware/userAuthentication");
const product=express.Router();

product.get("/",async(req,res)=>{
    try{
        let data= await ProductModel.find();
        res.send(data);
    }catch(err){
        console.log({"error":err.message})
    }
})

product.post("/addProduct",async(req,res)=>{
    try{
        let item=req.body;
        let data=new ProductModel(item);
        await data.save();
        res.send({"msg":"new product added"})
    }catch(err){
        res.send({"err":err.message})
    }
})

product.delete("/deleteProduct/:id",async(req,res)=>{
    try{
        let productId=req.params.id;
        await ProductModel.findByIdAndDelete(productId);
        res.send({"msg":"item deleted"})
    }catch(err){
        res.send({"error":err})
    }
})

product.put("/updateProduct/:id",async(req,res)=>{
    try{
        let productId=req.params.id;
        console.log(req.params);
        // let data=await ProductModel.find({_id:productId});
        // res.send(data);
        let data=await ProductModel.findByIdAndUpdate({_id:productId},req.body);
        res.send({"msg":"item updated","data":data})
    }catch(err){
        res.send({"error":err})
    }
})

/**sorting by title */
product.get("/increaseTitle",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({title:1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

/**sorting by title */
product.get("/decreaseTitle",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({title:-1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

/**sorting by price */
product.get("/increasePrice",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({price:1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

/**sorting by price */
product.get("/decreasePrice",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({price:-1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

/**sorting by rating */
product.get("/increaseRating",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({rating:1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

/**sorting by rating */
product.get("/decreaseRating",async(req,res)=>{
    try{
        let data=await ProductModel.find().sort({rating:-1});
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

product.get("/sub/:name",async(req,res)=>{
    let name=req.params.name;
    try{
        let data=await ProductModel.find({"title":{ $regex: `${name}`, $options: 'i' }})
        res.send(data);
    }catch(err){
        res.send({"error":err.message})
    }
})

product.post("/cart",authentication,async(req,res)=>{
    try{
        let item=req.body;
        let data=new cartModel(item);
        await data.save();
        res.send({"msg":"new product added"})
    }catch(err){
        res.send({"err":err.message})
    }
})

/**user.post("/one",authentication,async(req,res)=>{
    // console.log(req.body,"hello i am body");
    try{
        let data=await UserModel.findById({"_id":req.body.userID});
        // console.log(data);
        res.send(data);
    }catch(err){
        res.send({"error":err.message});
    }
}) */
module.exports={
    product
}
