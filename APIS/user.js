const exp=require("express");
const userApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");
//const { isJSDocUnknownTag } = require("typescript");
const jwt=require("jsonwebtoken");


const verifyToken=require("./middlewares/verifyToken")

userApiObj.use(exp.json())

//get request handler
/*userApiObj.get("/getusers",errHandler( async (req,res,next)=>{

    //get usercollectionobj
    let userCollectionObj=req.app.get("userCollectionObj")
    let users=await userCollectionObj.find().toArray();
    //res.send({message:users})
    console.log("user Obj is",req.body)
}))

userApiObj.get("/getuser/:usernameusername",errHandler( async (req,res,next)=>{
    let userCollectionObj=req.app.get("userColletionObj")
    
}))*/

userApiObj.get("/profile/:userId", errHandler(async(req,res,next)=>{
    console.log("printing from profile")
    let userCollectionObj=req.app.get("userCollectionObj");
     activity=await userCollectionObj.findOne({userId:req.params.userId});
     console.log(res)
    res.send({message:activity})
}))

userApiObj.put("/updateprofile", errHandler ( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userObj=req.body;
    console.log("userApi " + userObj) 
    console.log(userObj.userId)
    let user=await userCollectionObj.findOne({userId:userObj.userId})
    console.log(user)
    //if product is existed
    if(user!==null){
      let success =await userCollectionObj.updateOne({userId:userObj.userId},{$set:{email:userObj.email,firstname:userObj.firstname,lastname:userObj.lastname,number:userObj.number,password:userObj.password,username:userObj.username,
    }})
            res.send({message:"Profile updated"})
    }
    else{
        res.send({message:"User Profile not found"})
    }      

}))

userApiObj.get("/getactivity/:userId",verifyToken,errHandler(async(req,res,next)=>{
    console.log("printing from get activity")
    let userCollectionObj=req.app.get("userCollectionObj");
     activity=await userCollectionObj.find({userId:req.params.userId}).toArray();
 
    res.send({message:activity})
}))

userApiObj.get("/profile/:userId", errHandler(async(req,res,next)=>{
    
    let userCollectionObj=req.app.get("userCollectionObj");
     activity=await userCollectionObj.findOne({userId:req.params.userId});
    
    res.send({message:activity})
}))

userApiObj.post("/activity",errHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userobj=req.body;
      //create user
            let success=await userCollectionObj.insertOne(userobj)
            res.send({message:"user activity created"})
    
    console.log("user activity is", userobj)

}))



userApiObj.post("/register",errHandler( async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userobj=req.body;
    //check for user in db
    let user=await userCollectionObj.findOne({username:userobj.username})
    //if user is existed
    if(user!==null){
           res.send({message:"user existed"})
    }
    else{
        //hash the password
        let hashedPw=await bcryptjs.hash(userobj.password,6)

        //replace plain text password with hashed password
                userobj.password=hashedPw;
            //create user
            let success=await userCollectionObj.insertOne(userobj)
            res.send({message:"user created"})
    }
    console.log("user obj is", userobj)

}))






userApiObj.post("/login",errHandler( async(req,res,next)=>{
    console.log("entered")
    let userCollectionObj=req.app.get("userCollectionObj")
    let userObj=req.body;
    console.log(userObj)
         console.log("userapi")
    let user=await userCollectionObj.findOne({email:userObj.email})
    console.log(user)
    console.log("user ......")
    //if user
    if(user==null){
        res.send({"message":"Invalid Email id"})
    }
    else{
        //verify password
      let status=await  bcryptjs.compare(userObj.password,user.password)
      //if password matched
      if(status==true){
          //create a token
         let token=await jwt.sign({username:user.username},"abcd",{expiresIn:100})
          //send a token
               res.send({message:"Logged in successfully",signedToken:token,username:user.username,userId:user.userId})
               //send({message:"success"})

      }
      else{
          res.send({"message":"Invalid password"})
      }
    }
}

))
     


userApiObj.post("/forgetpassword",errHandler(async(req,res,next)=>
{

    let userCollectionObj=req.app.get("userCollectionObj")
    let userObj=req.body;
    console.log(userObj);

    let user=await userCollectionObj.findOne({username:userObj.username})
    //if user is existed
    
    if(user!==null){
        let hash=await bcryptjs.hash(userObj.password1,6)
        let success=await userCollectionObj.updateOne({username:userObj.username},{$set:{
            password:hash
        }})
        res.send({message:"success"})
        console.log("success")
    }
    else{
        res.send({message:"user Not existed"});

    }
   
}))




//export userapiobj
module.exports=userApiObj;