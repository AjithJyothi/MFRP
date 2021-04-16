import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
  userId: any;
  orders: any = [];
  view: any;
  constructor(private us: UserService, private router: Router, private spinner: NgxSpinnerService) { }
num;
  ngOnInit(): void {
       this.userId = localStorage.getItem('userId');
       this.spinner.show();
       this.us.viewOrder(this.userId).subscribe(
        res => {




          this.orders = res.message;
          this.spinner.hide();
          const cartnum: [] = this.orders;
          this.us.cartvalue = cartnum.length;
          console.log(cartnum.length);

          this.num = cartnum.length;
        },
        err => {
          alert('Something went wrong');
          console.log(err.message);
        }
       );


  }

  viewItem(i): any{
    const userObj = this.orders[i];
    console.log(userObj);
    this.us.toview = userObj;
    this.view = this.us.toview;
    this.router.navigateByUrl('/viewproducts');
    console.log('product is ', userObj);
  }
  Logout(): any{


    localStorage.clear();

    this.router.navigateByUrl('/login');
}

  back(): any{
    this.router.navigateByUrl('/home');
  }
}
