import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private us:UserService, private router:Router) { }
  userId:any;
  user:any;
  ngOnInit(): void {
    this.userId=this.route.snapshot.params['userId'];
    console.log("update.ts "+this.userId)
    this.us.getOneUser(this.userId).subscribe(
     res=>{
       console.log(res["message"])
           this.user=res["message"]
           console.log("up ts"+this.user)
     },
     err=>{
       console.log(err)
     }
   )
  }

  onSubmit(formRef){
    formRef.userId=this.userId;
    let obj=formRef;
    console.log("onsubmit"+obj);
    this.us.editUser(obj).subscribe(
      res=>{
             if(res["message"]=="Profile updated"){
               alert("Profile updated")
               this.router.navigateByUrl("/profile")
             }
             if(res["message"]=="User Profile not found"){
             alert(res)
             }
      },
      err=>{
             alert("Something went wrong")
             console.log(err)
      }
    )
  }

}
