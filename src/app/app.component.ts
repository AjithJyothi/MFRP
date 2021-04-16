import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meanstack';
 username: any;
 user: any = false;
 myname = 'Supriya H R';
products: any;
searchTerm: string;
  select: string;
 constructor(private router: Router, private us: UserService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    if (this.username != null){
       this.user = true;
    }
    this.us.setmyname(this.myname);

    this.us.getproducts().subscribe(
      res => {

this.spinner.show();
this.products = res.message;
this.spinner.hide();

      },
      err => {
        alert('Something went wrong in Adding product');
        console.log(err);
      }
    );

  }

  Logout(): void{


    localStorage.clear();

    this.router.navigateByUrl('/pre');
}

viewcart(): void{
  if (this.username != null)
 { this.router.navigateByUrl('/cart'); }
 else
 {
   this.router.navigateByUrl('/login');
 }
}

}

