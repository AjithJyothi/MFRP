
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userId: any;
  phoneno: any;
  firstname: any;
  lastname: any;
  emailid: any;
user: any;
  constructor(private us: UserService, private router: Router, private spinner: NgxSpinnerService) {}


    ngOnInit(): void {
      this.userId = localStorage.getItem('userId');
      this.spinner.show();
      this.us.userProfile(this.userId).subscribe(
         res => {
             this.user = res.message;
             this.spinner.hide();

         },
         err => {
           console.log(err);
         }
       );


  }
  Logout(): any{


    localStorage.clear();

    this.router.navigateByUrl('/login');
}

}


