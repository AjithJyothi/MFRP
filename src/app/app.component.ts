import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanstack';
 username:any
 user:any=false;
 search: any;

 constructor(private router:Router){}

  ngOnInit(): void {  
    this.username=localStorage.getItem("username")
    if(this.username!=null){
       this.user=true;
    }
  }

  Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}

viewcart(){
  if(this.username!=null)
 { this.router.navigateByUrl("/cart")}
 else
 {
   this.router.navigateByUrl("/login")
 }
}
onSearch()
  {
    localStorage['searchValue'] = this.search
    this.router.navigateByUrl('/search')
  }

}


