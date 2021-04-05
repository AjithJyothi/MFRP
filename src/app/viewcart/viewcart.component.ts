import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  products:any;
  username:any;
  total:any=0;
  num;

  constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    
   
    this.username=localStorage.getItem("username")
    this.getproduct();
    
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

  ifOk(){

  }
 

  deleteproduct(i){
    this.products.splice(i, 1);
    this.us.deleteproduct(this.products[i].productname).subscribe(
      res=>{
           
        if(res["message"]=="Product details deleted")
        {
          alert("product removed")
        }
      },
      err=>{
        alert("Something went wrong in Adding product")
        console.log(err)
      }
    )
  }


  goback(){
    this.router.navigateByUrl("/home")
  }

}