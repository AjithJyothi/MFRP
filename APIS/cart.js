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

cartApiObj.post("/deleteproduct",errHandler(async(req,res,next)=>{
   
    let cartCollectionObj = req.app.get("cartCollectionObj");
    let cartObj =  req.body;
   
    //console.log("user object is",cartObj);
    //check for user in db
    let product = await cartCollectionObj.findOne({bookname:cartObj.bookname});

    //product is there
    if(products!==null){
        let remove=await cartCollectionObj.deleteOne({bookname:cartObj.bookname});
        res.send({message:"Book removed from cart successfully"});
    }
    else{
        res.send({message:"book not found in usercart"})
    }

}))



//export userapiobj
module.exports=cartApiObj;