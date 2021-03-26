import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService, private router:Router) { }
    
  ngOnInit(): void {
  }
  onSubmit(formRef:any){
    let userObj=formRef.value
        this.us.createUser(userObj).subscribe(
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
