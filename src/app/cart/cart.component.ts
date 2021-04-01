import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any;
  username:any;
  total=0;
  num;
  inp;
  constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getproduct();
    this.totalprice()
   
  }
 incr(i){
  this.products[i].quantity+=1
  this.products[i].price+=this.products[i].price
 this.inp=this.products[i].price
 }
 decr(i){
  this.products[i].quantity-=1
  
  
}
  getproduct(){
    this.us.getproduct(this.username).subscribe(
      res=>{
           console.log("hello worldd")
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
