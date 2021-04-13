import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
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
  constructor(private us:UserService, private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")
    if(this.userId==null){this.router.navigateByUrl("/login")}
    this.getproduct();
    this.totalprice()
   
  }
 incr(i){
  this.products[i].quantity+=1
  this.products[i].price+=this.products[i].price
 this.inp=this.products[i].price
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
  this.products[i].quantity-=1
  
  
}
  getproduct(){
    this.us.getproduct(this.userId).subscribe(
      res=>{
        this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
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
    for(let i=0;i<this.num;i++)
    {
     this.total+=this.products[i].price
     console.log(this.total)
    }
  }
  goback(){
    this.router.navigateByUrl("/home")
  }
}
