import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService, private router:Router) { }
  login;
  status;
  ngOnInit(): void {
  }

  forgetpass(){
    this.router.navigateByUrl("/home")
  }

  onSubmit(formRef:any){
    let userCredObj=formRef.value;
    console.log(userCredObj)
    //if user
   if(userCredObj.username=="admin" && userCredObj.password=="admin")
   {
    this.router.navigateByUrl("/productdetails")    

    } 
    else{
     
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="Logged in successfully"){
            this.status=1;
              //store token and username in localstorage
              localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
              this.login= res["message"]
              //navigate to userdashboard
            
          }
          else{
            this.status=2;
            this.login= res["message"]
          }
        },
        err=>{
          this.status=2;
          this.login="Something went wrong"
          
        }
      )
    }
  }


  ifOk(){
    if(this.status==1)
    this.router.navigateByUrl("/home")
    
  }
}