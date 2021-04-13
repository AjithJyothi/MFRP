import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private us:UserService, private router:Router,private toastr: ToastrService, private route:ActivatedRoute) { }
  courses:any;
  product:any=[];
userId:any;
bookId:any
  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")
    this.bookId=this.route.snapshot.params['bookId'];
     console.log("update.ts "+this.bookId)
     this.us.getOneBook(this.bookId).subscribe(
      res=>{
        console.log(res["message"])
            this.product=res["message"]
            console.log("viewproduct ts "+this.product)
      },
      err=>{
        console.log(err)
      }
    )
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

   onSubmit(formRef:any){
    this.router.navigateByUrl("/cart")
     if(this.userId==null){
      this.router.navigateByUrl("/login")
      }
        else{
         
          let userObj=formRef.value
    
          console.log(userObj)
      
              this.us.tocart(userObj).subscribe(
                res=>{
                     
                      if(res["message"]=="product Added"){
                      this.toastr.success('book added to cart') 


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
