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
  total:any=0;
  num;
  constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getproduct();
  }
 incr(i){
  this.products[i].quantity+=1
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
      },
      err=>{
        alert("Something went wrong in Adding product")
      })
  }
  goback(){
    this.router.navigateByUrl("/home")
  }
}
