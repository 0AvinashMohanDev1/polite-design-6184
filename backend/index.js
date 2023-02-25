const express=require("express");
require("dotenv").config();
const {connection}=require("./Models/db");
const cors=require("cors");
const app=express();
const {user}=require("./Routes/userRoute.js");
const {product}=require("./Routes/productRoute");

app.use(express.json());
app.use(cors());

app.use("/product",product);
app.use("/user",user);

app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection;
        console.log(`connected to ${process.env.PORT} `)
    }catch(err){
        console.log("something went wrong here");
    }
})