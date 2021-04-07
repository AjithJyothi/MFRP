import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService, private router:Router ,private toastr: ToastrService) { }
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
   if(userCredObj.userId=="admin" && userCredObj.password=="admin")
   {
    this.toastr.success('admin login', 'login success');
  

    
    
    this.router.navigateByUrl("/productdetails")    

    } 
    else{
      console.log("subscribe")
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          console.log(res["message"])
          if(res["message"]=="Logged in successfully"){
            this.status=1;
              //store token and username in localstorage
              localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
              this.toastr.success('user login', 'login success');
              //alert(res["message"])
              //navigate to userdashboard
              this.router.navigateByUrl("/home")
          } 
          else{
            this.status=2;
            this.login= res["message"]
            this.toastr.success('user login', 'login success');
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
