import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any;
  userId:any;
  total=0;
  num;
  inp;
  constructor(private us:UserService, private toastr:ToastrService, private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")
    if(this.userId==null){this.router.navigateByUrl("/login")}
    this.getproduct();
    
   
  }
  incr(i){
    let price=this.products[i].price/this.products[i].quantity
   this.products[i].quantity+=1
   this.products[i].price=this.products[i].quantity*price
 
   this.totalprice()
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
    
   },
   err=>{
     alert("Something went wrong")
     console.log(err)
   }
 )
  }
}

decr(i){
  if( this.products[i].quantity==1){
    this.toastr.error("cannot decrement")
  }
  else{
   let price=this.products[i].price/this.products[i].quantity
   this.products[i].quantity-=1
   this.products[i].price=this.products[i].quantity*price

 
  }
  this.totalprice()
 
}
getproduct(){
  this.us.getproduct(this.userId).subscribe(
    res=>{
         console.log("hello world")
      this.products= res.message
      console.log(this.products)
      let cartnum:[]=this.products
      this.us.cartvalue=cartnum.length
      console.log(cartnum.length)
      
      this.num=cartnum.length
      for(let i=0;i<this.num;i++)
      {
       this.total+=this.products[i].price
       console.log(this.total)
      }
    },
    err=>{
      this.toastr.error("Something went wrong in Adding product")
      //alert("Something went wrong in Adding product")
    })
    
}
totalprice(){
  this.total=0
  let cartnum:[]=this.products
  this.us.cartvalue=cartnum.length
  console.log(cartnum.length)
  
  this.num=cartnum.length
  for(let i=0;i<cartnum.length;i++)
  {
    let price=this.products[i].price/this.products[i].quantity
   this.total+=price*this.products[i].quantity
   console.log(this.total)
  }
}
goback(){
  this.router.navigateByUrl("/home")
  
}
delete(obj)
{
  
  this.us.deleteCartProduct(obj).subscribe(
    res=>{
      if(res.message){
        this.toastr.success("Product removed from usercart")
        window.location.reload ();
      }
    },
    err=>{
      this.toastr.error("Something went wrong in user creation");
      console.log(err);
    }
  )
}


}
