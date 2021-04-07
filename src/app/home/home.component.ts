import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
courses:any;
username:any;
products:any=[];
toview:any;
num;
view;
one;two;three;four;five;six;
category=["FullStack","NodeJS","angular","JS","HtmlCssAndRwd","MongoDB"]
bss:any=true;
  catcourses:any=[];
  categories:any=[{ct:"fullstack"},{ct:"angular"},{ct:"NodeJS"},{ct:"JS"},{ct:"HtmlCssAndRwd"},{ct:"MongoDB"}]
constructor(private us:UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
   
    this.username=localStorage.getItem("username")
      if(this.username==null){this.router.navigateByUrl("/pre")}
    this.getdata()
    this.getproduct()
  // this. sorting()
    console.log(this.num)
  
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
    if(this.username==null){
      this.router.navigateByUrl("/login")
    }
  else{
    product.username=this.username;
   console.log(product)
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
  this.us.getproduct(this.username).subscribe(
    res=>{
         console.log("hello worldd")
      this.products= res["message"]
      console.log(this.products)
      let cartnum:[]=this.products
      this.us.cartvalue=cartnum.length
      console.log(cartnum.length)
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
  if(this.username!=null)
 { this.router.navigateByUrl("/cart")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}

myOrders(){
  if(this.username!=null)
 { this.router.navigateByUrl("/vieworder")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}

  getdata(){
    this.us.getproducts().subscribe(
       res=>{
            
         this.courses= res["message"]
       },
       err=>{
         alert("Something went wrong in Adding product")
         console.log(err)
       }
     )
   }


   
  findcat(obj) {
    this.bss = false
    let cat = obj.ct
    console.log(cat);
    this.us.getbook(cat).subscribe(
      res => {
        this.catcourses = res["message"];
        console.log(this.catcourses)
        console.log("success")
      },
      err => {
        alert("Something went wrong")
        console.log(err.message)
      }
    )
  }

   onSubmit(formRef:any){
    let userObj=formRef.value
    
    console.log(userObj)
    
        this.us.tocart(userObj).subscribe(
          res=>{
               
                if(res["message"]=="product Added"){
                  this.toastr.success('book added successfully')  
                  this.getproduct();
                }
          },
          err=>{
            alert("Something went wrong in Adding Product")
            console.log(err)
          }
        )
        
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
