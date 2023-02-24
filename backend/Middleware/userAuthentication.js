require("dotenv").config();
const jwt=require("jsonwebtoken");

function authentication(req,res,next){
    let head=req.headers.authorization;
    // res.send(head);
   let decoded= jwt.verify(head,process.env.jwtSecretKey)
//    ,(err,decoded)=>{
        if(decoded){
            req.body["userID"]=decoded.userID;
            next();
        }else{
            res.send({"error":"log in first"});
        } 
    // })
    // console.log(decoded);
    // next();
    // if(token){
    //     req.body["userID"]=token.userID;
    //     next();
    // }else{
    //     res.send("log in first");
    // }
}

module.exports={
    authentication
}