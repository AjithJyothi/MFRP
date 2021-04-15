import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanstack';
 username:any
 user:any=false;
 myname:string="Supriya H R";
products:any;
searchTerm:string;
  select:string;
 constructor(private router:Router, private us:UserService){}

  ngOnInit(): void {  
    this.username=localStorage.getItem("username")
    
    if(this.username!=null){
       this.user=true;
    }
    this.us.setmyname(this.myname);

    this.us.getproducts().subscribe(
      res=>{
          
        this.products= res["message"]
      
      },
      err=>{
        alert("Something went wrong in Adding product")
        console.log(err)
      }
    )

  }

  Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/pre")
}

viewcart(){
  if(this.username!=null)
 { this.router.navigateByUrl("/cart")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}

}

