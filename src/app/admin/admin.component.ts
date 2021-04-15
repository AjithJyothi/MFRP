import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private us:UserService, private router:Router,private toastr: ToastrService) { }
    
  ngOnInit(): void {
  }
  file:File;
  incomingfile(event)
   {
   this.file= event.target.files[0];
   }
   formData=new FormData();
    bookId:any;
  onSubmit(formRef:any){
    let userObj=formRef.value
    this.bookId = (Math.floor(Math.random() * 101))+100;
    console.log(this.bookId)
    let num=this.bookId;
    userObj.bookId=num.toString();
    console.log(userObj)
    this.formData.append('photo',this.file,this.file.name);
 this.formData.append("userObj",JSON.stringify(userObj))
    console.log(this.formData);
        this.us.addproduct(this.formData).subscribe(
          res=>{
            this.toastr.success('Product Added Successfuly');
                if(res["message"]=="product Added"){
                  //alert("Product Added Successfuly")
                }
          },
          err=>{
            alert("Something went wrong in Adding Product")
            console.log(err)
          }
        )
        this.router.navigateByUrl("/productdetails")
  }

}
