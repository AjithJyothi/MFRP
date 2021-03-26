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
              //store token and username in localstorage
              localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
              alert(res["message"])
              //navigate to userdashboard
              this.router.navigateByUrl("/home")
          }
          else{
          alert(res["message"])
          }
        },
        err=>{
          alert("Something went wrong")
          console.log(err)
        }
      )
    }
  }
}
