const exp=require("express");
const myorderApiObj=exp.Router();
const errHandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
myorderApiObj.use(exp.json())

myorderApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let myorderCollectionObj=req.app.get("myorderCollectionObj")
    let obj=req.body; 
    console.log("api "+obj)        
            let success=await myorderCollectionObj.insertOne(obj)
            res.send({message:"Order Placed Successfully"})
    console.log("product is ", obj)
  
}))

myorderApiObj.get("/vieworder/:userId",errHandler( async(req,res,next)=>{
    const myorderCollectionObj=req.app.get("myorderCollectionObj")
    console.log(req.params.username)
    let success=await myorderCollectionObj.find({userId:req.params.userId}).toArray()
    console.log(success)
    console.log("success")
    res.send({message:success})
}))

module.exports=myorderApiObj;