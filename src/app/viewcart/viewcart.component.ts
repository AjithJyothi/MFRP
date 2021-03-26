import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  products:any;
  username:any;
  total:any=0;
  

  constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getproduct();
   
    this.username=localStorage.getItem("username")
    
    this.totalamnt();
  }

  getproduct(){
    this.us.getproduct(this.username).subscribe(
      res=>{
           console.log("hello worldd")
        this.products= res["message"]
        console.log(this.products)
        
      },
      err=>{
        alert("Something went wrong in Adding course")
      })
  }

  
  totalamnt(){
for(let i=0;i<this.products.length;i++)
{
  this.total+=this.products[i].productprice
 
}
  }

  deleteproduct(i){
    this.products.splice(i, 1);
    this.us.deleteproduct(this.products[i].productname).subscribe(
      res=>{
           
        if(res["message"]=="Product details deleted")
        {
          alert("product removed")
        }
      },
      err=>{
        alert("Something went wrong in Adding course")
        console.log(err)
      }
    )
  }


  goback(){
    this.router.navigateByUrl("/home")
  }

}
