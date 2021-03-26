import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private us:UserService, private router:Router) { }
    
  ngOnInit(): void {
  }
  file:File;
  incomingfile(event)
   {
   this.file= event.target.files[0];
   }
   formData=new FormData();

  onSubmit(formRef:any){
    let userObj=formRef.value
    console.log(userObj)
    this.formData.append('photo',this.file,this.file.name);
 this.formData.append("userObj",JSON.stringify(userObj))
    console.log(this.formData);
        this.us.addproduct(this.formData).subscribe(
          res=>{
               
                if(res["message"]=="product Added"){
                  alert("Product Added Successfuly")
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
