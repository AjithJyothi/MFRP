const exp=require("express");
const wishlistApiObj=exp.Router();
const errHandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
wishlistApiObj.use(exp.json())

wishlistApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    let obj=req.body;  
    console.log("wishlist api "+ obj)       
            let success=await wishlistCollectionObj.insertOne(obj)
            res.send({message:"Adder to wishlist Successfully"})
    console.log("product is ", obj)
  
}))

wishlistApiObj.get("/viewlist/:userId",errHandler( async(req,res,next)=>{
    const wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    console.log(req.params.userId)
    let success=await wishlistCollectionObj.find({userId:req.params.userId}).toArray()
    console.log(success)
    console.log("success")
    res.send({message:success})
}))

module.exports=wishlistApiObj;