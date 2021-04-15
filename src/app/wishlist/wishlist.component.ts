import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private us:UserService, private router:Router,private spinner: NgxSpinnerService) { }
products;
userId;
total;
num;
  ngOnInit(): void {
    
    this.userId=localStorage.getItem("userId")
    this.getproduct();
  }

  getproduct(){
    this.us.viewlist(this.userId).subscribe(
      res=>{
        this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
           console.log("wishlist page")
        this.products= res.message
        console.log(this.products)
        let cartnum:[]=this.products
        this.us.cartvalue=cartnum.length
       
        
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
  Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}


}
