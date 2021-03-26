import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-pre',
  templateUrl: './pre.component.html',
  styleUrls: ['./pre.component.css']
})
export class PreComponent implements OnInit {

  courses:any;
  username:any;
  toview:any;
  constructor(private us:UserService, private router:Router) { }
  
    ngOnInit(): void {
      this.getdata()
      this.username=localStorage.getItem("username")
      if(this.username!=null){this.router.navigateByUrl("/home")}
     
    }
  
  Logout(){
    this.router.navigateByUrl("/login")
  }
  
  viewcart(){
    this.router.navigateByUrl("/login")
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
  
  
     onSubmit(formRef:any){
      let userObj=formRef.value
      if(this.username!=null){
        this.router.navigateByUrl("/home")
      }
      else{
      this.router.navigateByUrl("/login")
      }
    }
  
    DeleteItem(i){
      console.log("product is ",this.courses[i])
    }
  
    viewItem(i){
      let userObj=this.courses[i]
      console.log(userObj)
      this.us.toview=userObj;
      this.router.navigateByUrl("/viewproducts")
      console.log("product is ",userObj)
    }
  
  
     addto(formRef){
      let userObj=formRef.value
      this.us.tocart(userObj).subscribe(
        res=>{
              if(res["message"]=="user existed"){
                  alert("user name is already taken... choose different user name")
                  formRef.clear();
              }
              if(res["message"]=="user created"){
                alert("Registration success")
  
                //navigate to login component
                this.router.navigateByUrl("/login")
              }
  
        },
        err=>{
          alert("Something went wrong in user creation")
          console.log(err)
        }
      )
     }
  }
