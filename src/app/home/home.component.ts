import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
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
bss:any=true;
  catcourses:any=[];
  categories:any=[{ct:"fullstack"},{ct:"angular"},{ct:"NodeJS"},{ct:"JS"},{ct:"HtmlCssAndRwd"},{ct:"MongoDB"}]
constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
   
    this.username=localStorage.getItem("username")
    this.getdata()
    this.getproduct()
   
    console.log(this.num)
  
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


   findcat(obj){
    this.bss=false
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
         )
   }

   onSubmit(formRef:any){
    let userObj=formRef.value
    
    console.log(userObj)
    
        this.us.tocart(userObj).subscribe(
          res=>{
               
                if(res["message"]=="product Added"){
                  alert("Product Added Successfuly")
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
