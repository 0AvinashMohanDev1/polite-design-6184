require("dotenv").config();
const jwt=require("jsonwebtoken");

function authentication(req,res,next){
    let head=req.headers.authorization;
    // res.send(head);
   let decoded= jwt.verify(head,process.env.jwtSecretKey)
        if(decoded){
            req.body["userID"]=decoded.userID;
            next();
        }else{
            res.send({"error":"log in first"});
        }
}

module.exports={
    authentication
}