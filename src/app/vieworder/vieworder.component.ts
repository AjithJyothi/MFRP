import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
  username:any;
  orders:any=[];
  constructor(private us:UserService) { }

  ngOnInit(): void {
       this.username=localStorage.getItem("username") 
       this.us.viewOrder(this.username).subscribe(
        res=>{
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

}
