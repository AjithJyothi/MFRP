
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
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
  constructor(private us: UserService, private router: Router) {}
  
  
    ngOnInit(): void {
      this.userId=localStorage.getItem("userId")
       this.us.userProfile(this.userId).subscribe(
         res=>{
             this.user=res["message"];
            
         },
         err=>{
           console.log(err);
         }
       )
      
   
  }
  Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}

}


