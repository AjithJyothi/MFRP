import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
courses:any;
userId:any;
username:any;
products:any=[];
toview:any;
num;
view;
name:string;
searchTerm:string;
select:string
one;two;three;four;five;six;
category=["FullStack","NodeJS","angular","JS","HtmlCssAndRwd","MongoDB"]
bss:any=true;
  catcourses:any=[];
  categories:any=[{ct:"fullstack"},{ct:"angular"},{ct:"NodeJS"},{ct:"JS"},{ct:"HtmlCssAndRwd"},{ct:"MongoDB"}]
constructor(private us:UserService,private spinner: NgxSpinnerService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
   
    this.userId=localStorage.getItem("userId")
    this.username=localStorage.getItem("username")
      if(this.userId==null){this.router.navigateByUrl("/pre")}
    this.getdata()
    this.getproduct()
  // this. sorting()
   

    this.name=this.us.getmyname();
  
  }

  sorting(){
    //FullStack
      this.us.getbook(this.category[0]).subscribe(
        res=>{
            
          this.one= res["message"]
          console.log(this.products)
          
        },
        err=>{
          alert("Something went wrong in Adding product")
        })
        //NodeJs
        this.us.getbook(this.category[1]).subscribe(
          res=>{
              
            this.two= res["message"]
            console.log(this.products)
            
          },
          err=>{
            alert("Something went wrong in Adding product")
          })
          //angular
          this.us.getbook(this.category[2]).subscribe(
            res=>{
                
              this.three= res["message"]
              console.log(this.products)
              
            },
            err=>{
              alert("Something went wrong in Adding product")
            })
             //js
          this.us.getbook(this.category[3]).subscribe(
            res=>{
                
              this.four= res["message"]
              console.log(this.products)
              
            },
            err=>{
              alert("Something went wrong in Adding product")
            })
            //HtmlCssAndRwd
            this.us.getbook(this.category[4]).subscribe(
              res=>{
                  
                this.five= res["message"]
                console.log(this.products)
                
              },
              err=>{
                alert("Something went wrong in Adding product")
              })
              //MongoDb
              this.us.getbook(this.category[5]).subscribe(
                res=>{
                    
                  this.six= res["message"]
                  console.log(this.products)
                  
                },
                err=>{
                  alert("Something went wrong in Adding product")
                })
            


    
  }

  wishlist(product){
    console.log(product)
    if(this.userId==null){
      this.router.navigateByUrl("/login")
    }
  else{
    product.userId=this.userId;
    console.log(product)
   console.log("wishlist ts "+product)
   this.us.mylist(product).subscribe(
     res=>{
      this.toastr.success('book added to wishlist')
      
     },
     err=>{
       alert("Something went wrong")
       console.log(err)
     }
   )
    }
  }

 gotoProfile(){
   this.router.navigateByUrl("/profile")
 }
 gotoWishlist(){
  this.router.navigateByUrl("/wishlist")
 }
getproduct(){
  this.us.getproduct(this.userId).subscribe(
    res=>{
      this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
        
      this.products= res["message"]
     
      let cartnum:[]=this.products
      this.us.cartvalue=cartnum.length
     
      this.num=cartnum.length
    },
    err=>{
      alert("Something went wrong in Adding product")
    })
}


Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}

viewcart(){
  if(this.userId!=null)
 { this.router.navigateByUrl("/cart")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}

myOrders(){
  if(this.userId!=null)
 { this.router.navigateByUrl("/vieworder")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}

  getdata(){
    this.us.getproducts().subscribe(
       res=>{
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
         this.courses= res["message"]
       
       },
       err=>{
         alert("Something went wrong in Adding product")
         console.log(err)
       }
     )
   }


   
   findcat(obj){
    this.select="Category";
    this.searchTerm=obj.ct;
    console.log("select : "+this.select);
    console.log("search term : "+this.searchTerm)
   /* this.bss=false
    let cat=obj.ct
         console.log(cat);
         this.us.getbook(cat).subscribe(
          res=>{
            this.catcourses= res["message"];
            console.log(this.catcourses)
            console.log("success")
          },
          err=>{
            alert("Something went wrong")
            console.log(err.message)
          }
         )*/
   }


  onSubmit(formRef){
    console.log(formRef);
     // this.router.navigateByUrl("/cart")
      if(this.userId==null){
       this.router.navigateByUrl("/login")
       }
         else{
          
           let userObj=formRef
           let obj={
             username:this.username,
             bookname:userObj.booktitle,
             author:userObj.author,
             userId:this.userId,
             price:userObj.price,
             publisher:userObj.publisher,
             publishdate:userObj.publishdate,
             rating:userObj.rating,
            
             
             image:userObj.image,
             quantity:1,
             }
     
           console.log(obj)
       
               this.us.tocart(obj).subscribe(
                 res=>{
                      
                       if(res["message"]=="product Added"){
                       this.toastr.success('Book added to cart') 
 
 
                       }
                 },
                 err=>{
                   alert("Something went wrong in Adding Product")
                   console.log(err)
                 }
               )
         }
         
   }

  DeleteItem(i){
    console.log("product is ",this.courses[i])
  }

  viewItem(i){
    let userObj=this.courses[i]
    console.log(userObj)
    this.us.toview=userObj;
    this.view=this.us.toview
    this.router.navigateByUrl("/viewproducts")
    console.log("product is ",userObj)
  }


   addto(formRef){
    let userObj=formRef.value
    this.us.tocart(userObj).subscribe(
      res=>{
            if(res["message"]=="user existed"){
                alert("user name is already taken... choose different user name")
                formRef.clear();
            }
            if(res["message"]=="user created"){
              alert("Registration success")

              //navigate to login component
              this.router.navigateByUrl("/login")
            }

      },
      err=>{
        alert("Something went wrong in user creation")
        console.log(err)
      }
    )
   }
}
