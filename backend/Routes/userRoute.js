const express=require("express");
const {UserModel}=require("../Models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {authentication}=require("../Middleware/userAuthentication");

const user=express.Router();

user.get("/",async(req,res)=>{
    try{
        let data=await UserModel.find();
        res.send({"msg":"all user data is here","data":data});
    }catch(err){
        res.send({"error":err.message});
    }
})

/** creating new user id */
user.post("/register",async(req,res)=>{
    try{
        let payload=req.body;
        let data=await UserModel.find({"email":payload.email});
        console.log(data);
        if(data.length>0) res.send({"msg":"user already registered"})
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

/** loging in the resgistered user */

user.post("/login",async(req,res)=>{
    try{
        let payload=req.body;
        // console.log(payload);
        let data=await UserModel.find({$and:[{"email":payload.email}]});
        // res.send(data);
        if(data.length>0){
            // console.log(data)
            bcrypt.compare(payload.password,data[0].password,(err,result)=>{
                console.log(result);
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

/** showing the current logged user data */

user.post("/one",authentication,async(req,res)=>{
    // console.log(req.body,"hello i am body");
    try{
        let data=await UserModel.findById({"_id":req.body.userID});
        // console.log(data);
        res.send(data);
    }catch(err){
        res.send({"error":err.message});
    }
})

/** updating the users data */

user.put("/update",authentication,async(req,res)=>{
    
    if(req.body.password){
        await bcrypt.hash(req.body.password, 5, async(err, hash)=>{
            // Store hash in your password DB.
            if(hash){
                req.body.password=hash;
                console.log({"msg":"I am here ","hash":hash,"pass":req.body.password})
                await UserModel.findByIdAndUpdate(req.body.userID,req.body);
                res.send({"msg":"user updated"})
            }else{
                console.log("went wrong here");
            }
        });
    }else{
        let payload=req.body;
        console.log(payload);
        await UserModel.findByIdAndUpdate(payload.userID,payload);
        res.send({"msg":"user updated"})
    }
    
})

module.exports={
    user
}