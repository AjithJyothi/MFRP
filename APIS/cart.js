const exp=require("express");
const cartApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");
//const { isJSDocUnknownTag } = require("typescript");
const jwt=require("jsonwebtoken");
const verifyToken=require("./middlewares/verifyToken")
cartApiObj.use(exp.json())

cartApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let cartCollectionObj=req.app.get("cartCollectionObj")
    let obj=req.body;
    
            //create user
            let success=await cartCollectionObj.insertOne(obj)
            res.send({message:"product Added"})
    
    console.log("product is ", obj)
  
}))

cartApiObj.get("/getproduct/:username",errHandler(async(req,res,next)=>{
    
    let cartCollectionObj=req.app.get("cartCollectionObj");
     products=await cartCollectionObj.find({username:req.params.username}).toArray();
   
    res.send({message:products})
}))

cartApiObj.delete("/deleteproduct/:productname",errHandler(async (req,res,next)=>{
    
  
    
   let user=await cartCollectionObj.removeOne({productname:req.params.productname})
    res.send({message:"Product details deleted"})
   
    
}))



//export userapiobj
module.exports=cartApiObj;