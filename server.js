//create express object
const exp=require("express")

require("dotenv").config();

const app=exp();

const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")



//import API objects
const userApiObj=require("./APIS/user")

//const productApiObj=require("./APIS/productApi")
const adminApiObj=require("./APIS/admin")

const cartApiObj=require("./APIS/cart")
const myorderApiObj=require("./APIS/myorder")

//const myorderApiObj=require("./APIS/myorders")

const wishlistApiObj=require("./APIS/wishlist")


const mc=require("mongodb").MongoClient;

const path=require("path")

//const errHandler=require("express-async-handler")
app.use(exp.static(path.join(__dirname,"dist/meanstack")))

//forward req object to specific API based on path
app.use("/user",userApiObj)

app.use("/cart",cartApiObj)

app.use("/admin",adminApiObj)
app.use("/myorder",myorderApiObj)

app.use("/myorder",myorderApiObj)

app.use("/wishlist",wishlistApiObj)

const dburl=process.env.dburl

mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})

.then(client=>{
    //get database object
    const databaseObject=client.db("mfrp");
   const userCollectionObj=databaseObject.collection("user");
    const cartCollectionObj=databaseObject.collection("cart");
    const adminCollectionObj=databaseObject.collection("admin");
    const myorderCollectionObj=databaseObject.collection("myorder")

    const wishlistCollectionObj=databaseObject.collection("wishlist")
    //sharing collection object
    app.set("userCollectionObj",userCollectionObj)

    app.set("cartCollectionObj", cartCollectionObj)
    app.set("myorderCollectionObj",myorderCollectionObj)

   // app.set("productCollectionObj",productCollectionObj)
   app.set("adminCollectionObj",adminCollectionObj)

   //app.set("myorderCollectionObj",myorderCollectionObj)

   app.set("wishlistCollectionObj",wishlistCollectionObj)

    console.log("Connected to db successfully")  
})
.catch(err=>console.log(`error in db connection ${err}`))


app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`})
})




app.use((err,req,res,next)=>{
    res.send({message:"Error occured",reason:err.message})
})

//assign portnumber
app.listen(process.env.port || 8080,()=>console.log("web server on port 5000"))