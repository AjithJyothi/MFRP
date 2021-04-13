const exp=require("express");
const adminApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");

const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")


//const { isJSDocUnknownTag } = require("typescript");
const jwt=require("jsonwebtoken");

adminApiObj.use(exp.json())

cloudinary.config({
    cloud_name:'dm6327fhd',
    api_key:'156695387737685',
    api_secret: '7C8ZtDkXxrtH0goOTQC4I--LOLU'
   });
   
   const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'Ajith',
    public_id: file.fieldname + '-' + Date.now()
    }},
   });

   var upload = multer({ storage: storage });
//get request handler
adminApiObj.get("/getproducts",errHandler( async (req,res,next)=>{

    //get usercollectionobj
    let userCollectionObj=req.app.get("adminCollectionObj")
    let users=await userCollectionObj.find().toArray();
    res.send({message:users})
}))

adminApiObj.get("/getadmin/:adminname",errHandler( async (req,res,next)=>{
    let adminCollectionObj=req.app.get("adminColletionObj")
    let users=await adminCollectionObj.findOne({adminname:req.params.adminname})
    res.send({message:users})
}))

adminApiObj.post("/products",upload.single('photo'),errHandler( async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
    
    req.body=JSON.parse(req.body.userObj)
req.body.image=req.file.path;
    console.log(req.body)
            //create user
            let success=await adminCollectionObj.insertOne(req.body)
            res.send({message:"product Added"})
    
   

}))

/*adminApiObj.get("/getbooks/:category",errHandler( async (req,res,next)=>{
   
    let adminCollectionObj=req.app.get("adminColletionObj")
    console.log(req.params.category)
    //let users=await adminCollectionObj.find({category:req.params.category}).toArray();
    users=await adminCollectionObj.find({category:req.params.category}).toArray();
    console.log("from get books")
    console.log(users)
    res.send({message:users})
}))*/

adminApiObj.get("/getbooks/:category",errHandler( async(req,res,next)=>{
    const adminCollectionObj=req.app.get("adminCollectionObj")
    console.log("from getbooks")
    console.log(req.params.category)
    let success=await adminCollectionObj.find({category:req.params.category}).toArray()
    console.log(success)
    console.log("success")
    res.send({message:success})
}))

adminApiObj.get("/onebook/:bookId",errHandler( async(req,res,next)=>{
    console.log("entered")
    const adminCollectionObj=req.app.get("adminCollectionObj")
    let success=await adminCollectionObj.find({bookId:req.params.bookId}).toArray();
    res.send({message:success})
}))


adminApiObj.put("/updatebook", errHandler ( async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
    let userObj=req.body;
    console.log("adminApi " + userObj) 
    let user=await adminCollectionObj.findOne({bookId:userObj.bookId})
    console.log(user)
    //if product is existed
    if(user!==null){
      let success =await adminCollectionObj.updateOne({bookId:userObj.bookId},{$set:{author:userObj.author,binding:userObj.binding,price:userObj.price,category:userObj.category,language:userObj.language,publishdate:userObj.publishdate, publisher:userObj.publisher, rating:userObj.rating , image:userObj.image
    }})
            res.send({message:"book updated"})
    }
    else{
        res.send({message:"book not found"})
    }      

}))

adminApiObj.post("/removebook", errHandler( async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj");
    let userObj=req.body;
    console.log(userObj)
    let user=await adminCollectionObj.findOne({bookId:userObj.bookId})
    console.log(user)
    //if product is existed
    if(user!==null){
    //add product
            let success=await adminCollectionObj.deleteOne({bookId:userObj.bookId})
            res.send({message:"book removed"})
    }
  else{
      res.send({message:"book not found"})
  }
}))



//export adminApiObj
module.exports=adminApiObj;
