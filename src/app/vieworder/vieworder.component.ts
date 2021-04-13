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

  ngOnInit(): void {
       this.userId=localStorage.getItem("userId") 
       
       this.us.viewOrder(this.userId).subscribe(
        res=>{
          this.spinner.show();
       setTimeout(() => {
         this.spinner.hide();
       }, 2000);
          this.orders= res["message"];
          console.log(this.orders)
          console.log("success")
        },
        err=>{
          alert("Something went wrong")
          console.log(err.message)
        }
       )


  }

  back(){
    this.router.navigateByUrl("/home")
  }
}
