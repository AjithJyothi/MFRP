import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-pre',
  templateUrl: './pre.component.html',
  styleUrls: ['./pre.component.css']
})
export class PreComponent implements OnInit {

  courses:any;
  username:any;
  toview:any;
  searchTerm:string;
  select:string;
  bss:any=true;
  catcourses:any=[];
  categories:any=[{ct:"fullstack"},{ct:"angular"},{ct:"NodeJS"},{ct:"JS"},{ct:"HtmlCssAndRwd"},{ct:"MongoDB"}]
  constructor(private us:UserService,private spinner: NgxSpinnerService, private router:Router,private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.getdata()
      this.username=localStorage.getItem("username")
      if(this.username!=null){this.router.navigateByUrl("/home")}
     
    }
  
  Logout(){
    this.router.navigateByUrl("/login")
  }
  
  viewcart(){
    this.router.navigateByUrl("/login")
  }
    getdata(){ this.spinner.show();
      this.us.getproducts().subscribe(
         res=>{
         
            this.spinner.hide();
       
           this.courses= res["message"]
         },
         err=>{
           
           alert("Something went wrong in Adding course")
           console.log(err)
         }
       )
     }
  
  
     onSubmit(formRef:any){
      let userObj=formRef.value
      if(this.username!=null){
        this.router.navigateByUrl("/home")
      }
      else{
      this.router.navigateByUrl("/login")
      }
    }
  
    DeleteItem(i){
      console.log("product is ",this.courses[i])
    }
  
    viewItem(i){
      let userObj=this.courses[i]
      console.log(userObj)
      this.us.toview=userObj;
     this.router.navigateByUrl("/viewproducts")
      console.log("product is ",userObj)
    }

    findcat(obj){
      this.select="Category";
      this.searchTerm=obj.ct;
      console.log("select : "+this.select);
      console.log("search term : "+this.searchTerm)
     /* this.bss=false
      let cat=obj.ct
           console.log(cat);
           this.us.getbook(cat).subscribe(
            res=>{
              this.catcourses= res["message"];
              console.log(this.catcourses)
              console.log("success")
            },
            err=>{
              alert("Something went wrong")
              console.log(err.message)
            }
           )*/
     }
  
  
     addto(formRef){
      let userObj=formRef.value
      this.us.tocart(userObj).subscribe(
        res=>{
              if(res["message"]=="user existed"){
                this.toastr.error('user name is already taken... choose different user name');
                  //alert("user name is already taken... choose different user name")
                  formRef.clear();
              }
              if(res["message"]=="user created"){
                this.toastr.success('Registration success')
                //alert("Registration success")
  
                //navigate to login component
                this.router.navigateByUrl("/login")
              }
  
        },
        err=>{
          this.toastr.error('Something went wrong in user creation');
          //alert("Something went wrong in user creation")
          console.log(err)
        }
      )
     }
  }
