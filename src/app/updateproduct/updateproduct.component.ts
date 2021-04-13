import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(private us:UserService, private route:ActivatedRoute, private router:Router) { }
    bookId:any;
    book:any=[];
  ngOnInit(): void {
  //  this.username=localStorage.getItem("username")
     this.bookId=this.route.snapshot.params['bookId'];
     console.log("update.ts "+this.bookId)
     this.us.getOneBook(this.bookId).subscribe(
      res=>{
            this.book=res["message"]
            console.log(this.book)
      },
      err=>{
        console.log(err)
      }
    )
  }

  file:File;
  incomingfile(event)
   {
   this.file= event.target.files[0];
   }
   formData=new FormData();

  onSubmit(formRef){
    formRef.bookId=this.bookId;
    console.log(formRef)
      this.us.editBook(formRef).subscribe(
        res=>{
               if(res["message"]=="book updated"){
                 alert("book updated")
                 this.router.navigateByUrl("/productdetails")
               }
               if(res["message"]=="book not found"){
               alert(res)
               }
        },
        err=>{
               alert("Something went wrong")
               console.log(err)
        }
      )
  }

  cancel(){
    this.router.navigateByUrl("/productdetails")
  }



}
