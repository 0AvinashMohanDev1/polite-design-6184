const express=require("express");
const {ProductModel}=require("../Models/productModel")


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

module.exports={
    product
}
