const express=require("express");
const {UserModel}=require("../Models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {authentication}=require("../Middleware/userAuthentication")

const user=express.Router();

user.get("/",async(req,res)=>{
    try{
        let data=await UserModel.find();
        res.send({"msg":"all user data is here","data":data});
    }catch(err){
        res.send({"error":err.message});
    }
})

user.post("/register",async(req,res)=>{
    try{
        let payload=req.body;
        let data=await UserModel.find({"email":payload.email});
        if(data) res.send({"msg":"user alreadyy registered"})
        else{
            bcrypt.hash(payload.password, 5, function(err, hash) {
                // Store hash in your password DB.
                if(hash){
                    payload.password=hash;
                    let data=new UserModel(payload);
                    data.save();
                    res.send({"msg":"new user registerd"});
                }else{
                    console.log("went wrong here");
                }
            });
        }
        
       
    }catch(err){
        res.send({"msg":"something wrong happend","error":err.message});
    }
})

user.post("/login",async(req,res)=>{
    try{
        let payload=req.body;
        console.log(payload);
        let data=await UserModel.find({$and:[{"email":payload.email}]});
        // res.send(data);
        if(data.length>0){
            console.log(data)
            bcrypt.compare(payload.password,data[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({"userID":data[0]._id},process.env.jwtSecretKey);
                    res.send({"msg":"logged in","token":token})
                }else{
                    res.send({"error":"something went wrong"})
                }
            })
        }else{
            res.send({"error":"No user found","msg":"register first and try again"})
        }
    }catch(err){
        res.send({"error":err.message});
    }
})

user.put("/update",authentication,async(req,res)=>{
    let payload=req.body;
    console.log(payload);
    await UserModel.findByIdAndUpdate(payload.userID,payload);
    res.send({"msg":"user updated"})
})

module.exports={
    user
}