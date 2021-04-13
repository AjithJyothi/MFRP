
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  userId:any;
  phoneno:any;
  firstname:any;
  lastname:any;
  emailid:any;
user:any;
  constructor(private us: UserService) {}
  
  
    ngOnInit(): void {
      this.userId=localStorage.getItem("userId")
       this.us.userProfile(this.userId).subscribe(
         res=>{
             this.user=res["message"];
             console.log("final "+this.user)
         },
         err=>{
           console.log(err);
         }
       )
      
   
  }
}


