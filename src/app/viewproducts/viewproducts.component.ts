import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }
  courses: any;
  product: any = [];
  userId: any;
  bookId: any;
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.bookId = this.route.snapshot.params.bookId;
    this.spinner.show();
    console.log('update.ts ' + this.bookId);
    this.us.getOneBook(this.bookId).subscribe(
      res => {
        console.log(res.message);
        this.product = res.message;
        this.spinner.hide();
        console.log('viewproduct ts ' + this.product);
      },
      err => {
        console.log(err);
      }
    );
  }
  getdata(): any {
    this.us.getproducts().subscribe(
      res => {

        this.courses = res.message;
      },
      err => {
        this.toastr.error('Something went wrong in Adding product');
        // alert("Something went wrong in Adding product")
        console.log(err);
      }
    );
  }

  goto(): any {
    if (this.userId != null) {
      this.router.navigateByUrl('/home');
    }
    else { this.router.navigateByUrl('/pre'); }
  }

  placeOrder(product): any {
    if (this.userId == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      product.userId = this.userId;
      console.log(product);
      this.us.myOrder(product).subscribe(
        res => {
          this.toastr.success('Book ordered successfully');
          console.log(res.message);
        },
        err => {
          this.toastr.error('Something went wrong');
          // alert("Something went wrong")
          console.log(err);
        }
      );
    }
  }

  Logout(): any {


    localStorage.clear();

    this.router.navigateByUrl('/pre');
  }

  onSubmit(formRef): any {
    console.log(formRef);
    // this.router.navigateByUrl("/cart")
    if (this.userId == null) {
      this.router.navigateByUrl('/login');
    }
    else {

      const userObj = formRef;
      const obj = {

        bookname: userObj.booktitle,
        author: userObj.author,
        userId: this.userId,
        price: userObj.price,
        publisher: userObj.publisher,
        publishdate: userObj.publishdate,
        rating: userObj.rating,


        image: userObj.image,
        quantity: 1,
      };

      console.log(obj);

      this.us.tocart(obj).subscribe(
        res => {

          if (res.message === 'product Added') {
            this.toastr.success('Book added to cart');


          }
        },
        err => {
          alert('Something went wrong in Adding Product');
          console.log(err);
        }
      );
    }

  }
}
