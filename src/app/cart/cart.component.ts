import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any;
  username:any;
  total=0;
  count=1
  num;
  inp;
  cartnum: any;
  
  constructor(private us:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    if(this.username==null){this.router.navigateByUrl("/login")}
    this.getproduct();
    
   
  }
 incr(i){
   let price=this.products[i].price/this.products[i].quantity
  this.products[i].quantity+=1
  this.products[i].price=this.products[i].quantity*price

  this.totalprice()
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
    this.us.getproduct(this.username).subscribe(
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
        alert("Something went wrong in Adding product")
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


