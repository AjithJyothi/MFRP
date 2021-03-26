import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private us:UserService, private router:Router) { }
  courses:any;
  product:any= this.us.toview;
username:any;
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    
  }
  getdata(){
    this.us.getproducts().subscribe(
       res=>{
            
         this.courses= res["message"]
       },
       err=>{
         alert("Something went wrong in Adding course")
         console.log(err)
       }
     )
   }

   goto(){
     if(this.username!=null){
    this.router.navigateByUrl("/home")}
    else{this.router.navigateByUrl("/pre")}
   }

   onSubmit(formRef:any){
    let userObj=formRef.value
    
    console.log(userObj)
        this.us.tocart(userObj).subscribe(
          res=>{
               
                if(res["message"]=="product Added"){
                  alert("Product Added Successfuly")
                }
          },
          err=>{
            alert("Something went wrong in Adding Product")
            console.log(err)
          }
        )
        
  }
}
