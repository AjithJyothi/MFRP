
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  username:any;
  phoneno:any;
  firstname:any;
  lastname:any;
  emailid:any;

  constructor(private auth: UserService) {}
  
  
    ngOnInit(): void {
      
   
      this.username=localStorage.getItem("username")
   
      
   
  }
}


