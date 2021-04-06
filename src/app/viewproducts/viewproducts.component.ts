import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private us:UserService, private router:Router) { }
  courses:any;
  product:any= this.us.toview;
username:any;
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    
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

   goto(){
     if(this.username!=null){
    this.router.navigateByUrl("/home")}
    else{this.router.navigateByUrl("/pre")}
   }

   placeOrder(product){
      if(this.username==null){
        this.router.navigateByUrl("/login")
      }
    else{
      product.username=this.username;
     console.log(product)
     this.us.myOrder(product).subscribe(
       res=>{
         console.log(res["message"])
         alert(res["message"])
       },
       err=>{
         alert("Something went wrong")
         console.log(err)
       }
     )
      }
   }

   onSubmit(formRef:any){
    this.router.navigateByUrl("/login")
     if(this.username==null){
      this.router.navigateByUrl("/login")
      }
        else{
         
          let userObj=formRef.value
    
          console.log(userObj)
      
              this.us.tocart(userObj).subscribe(
                res=>{
                     
                      if(res["message"]=="product Added"){
                        alert("Product Added Successfuly")
                      }
                },
                err=>{
                  alert("Something went wrong in Adding Product")
                  console.log(err)
                }
              )
        }
        
  }
}
