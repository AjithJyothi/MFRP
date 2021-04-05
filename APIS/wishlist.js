const exp=require("express");
const wishlistApiObj=exp.Router();
const errHandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
wishlistApiObj.use(exp.json())

wishlistApiObj.post("/addto",errHandler( async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    let obj=req.body;         
            let success=await wishlistCollectionObj.insertOne(obj)
            res.send({message:"Adder to wishlist Successfully"})
    console.log("product is ", obj)
  
}))

wishlistApiObj.get("/viewlist/:username",errHandler( async(req,res,next)=>{
    const wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    console.log(req.params.username)
    let success=await wishlistCollectionObj.find({username:req.params.username}).toArray()
    console.log(success)
    console.log("success")
    res.send({message:success})
}))

module.exports=wishlistApiObj;