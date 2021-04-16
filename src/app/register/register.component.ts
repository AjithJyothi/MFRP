import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
//import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    formData=new FormData;
    userId:any;
    displayId;
  constructor(private us:UserService, private router:Router) { }
    //  regform:FormGroup;
  ngOnInit(): void {
   /* this.regform=this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required],
    });*/
    //this.userId = (Math.floor(Math.random() * 201))+8000;
  }
  reg:any;
  onSubmit(formRef:any){
    let userObj=formRef.value
    this.userId = (Math.floor(Math.random() * 201))+8000;
    console.log(this.userId)
    let num=this.userId;
    userObj.userId=num.toString();
    console.log(userObj)
    this.us.createUser(userObj).subscribe(
          res=>{
                if(res["message"]=="user existed"){
                  this.displayId="user name is already taken... choose different user name"
                    
                    formRef.clear();
                }
                if(res["message"]=="user created"){
                 
                 this.displayId=this.userId
                }

          },
          err=>{
            alert("Something went wrong in user creation")
            console.log(err)
          }
        )
  }

  ifOk(){
    this.router.navigateByUrl("/login")
  }
}
