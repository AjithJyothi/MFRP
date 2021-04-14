import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private us:UserService,private spinner: NgxSpinnerService, private router:Router,private toastr: ToastrService) { }
  courses:any;
  product:any= this.us.toview;
  username;
userId:any;
  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")
    this.username=localStorage.getItem("username")
    this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);
    
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
     if(this.userId!=null){
    this.router.navigateByUrl("/home")}
    else{this.router.navigateByUrl("/pre")}
   }

   placeOrder(product){
      if(this.userId==null){
        this.router.navigateByUrl("/login")
      }
    else{
      product.userId=this.userId;
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
}
