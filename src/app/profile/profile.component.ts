
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  obj: any;

 

  constructor(private us:UserService,private toastr:ToastrService,private router:Router) {}
  
  
    ngOnInit(): void {
      let username=localStorage.getItem("username")
      this.obj=this.us.getUser(username).subscribe(
        res=>{
          if(res.message=="success")
          {
            this.obj=res.user;
          }
          else{
            this.toastr.error(res.message)
            //navigate login
            this.router.navigateByUrl("/login")
  
          }
        },
        err=>{
          this.toastr.error("something went wrong in user profile")
          console.log(err)
        }
      )
      }
      
   
  }



