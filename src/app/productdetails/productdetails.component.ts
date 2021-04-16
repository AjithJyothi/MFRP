import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor(private us: UserService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) { }
  courses: any;
  Update = false;
  products;
 fullstack = [];

userObj: any;
  ngOnInit(): void {
    this.spinner.show();
    this.getdata();


  }



  getdata(): any{
    this.spinner.show();
    this.us.getproducts().subscribe(
       res => {


         this.courses = res.message;
         this.spinner.hide();
         console.log(this.courses);
       },
       err => {
        this.spinner.hide();
        this.toastr.error('Something went wrong in adding product');

         // alert("Something went wrong in Adding product")
        console.log(err);
       }
     );
   }

   arrayset(): any{

   }
   onSubmit(formRef: any): any{
     this.userObj = formRef.value;

     this.us.addproduct(this.userObj).subscribe(
          res => {
            this.toastr.success('Product Added Successfully');

            if (res.message === 'product Added'){
                  // alert("Product Added Successfuly")
                }
          },
          err => {
            this.toastr.error('Something went wrong in Adding Product');

            alert('Something went wrong in Adding Product');
            console.log(err);
          }
        );
     this.router.navigateByUrl('/viewproducts');
  }


   EditItem(a1, a2, a3, a4, a5, i): any{
    console.log(this.userObj);
    this.Update = !this.Update;
   }

   DeleteItem(i): any{
    this.courses.splice(i, 1);
   }

   goto(): any{
    this.router.navigateByUrl('/admin');
   }

   delete(obj, i): any{
    console.log(obj);
    this.courses.splice(i, 1);
    this.us.deleteBook(obj).subscribe(
      res => {
            if (res.message === 'book removed'){
              this.toastr.success('book removed');

            }
            if (res.message === 'book not found') {

            this.toastr.success('book not found');
            }
      },
      err => {
        this.toastr.success('something went wrong');
        console.log(err);
      }
    );
  }
  Logout(): any{


    localStorage.clear();

    this.router.navigateByUrl('/pre');
   }
}
