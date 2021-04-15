import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from "@angular/router"
@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
  userId:any;
  orders:any=[];
  constructor(private us:UserService,private router:Router,private spinner: NgxSpinnerService) { }
num;
  ngOnInit(): void {
       this.userId=localStorage.getItem("userId") 
       this.spinner.show();
       this.us.viewOrder(this.userId).subscribe(
        res=>{
          
       
         this.spinner.hide();
       
          this.orders= res["message"];
          let cartnum:[]=this.orders
      this.us.cartvalue=cartnum.length
      console.log(cartnum.length)
      
      this.num=cartnum.length
        },
        err=>{
          alert("Something went wrong")
          console.log(err.message)
        }
       )


  }
  Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}

  back(){
    this.router.navigateByUrl("/home")
  }
}
