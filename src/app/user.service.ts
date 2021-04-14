import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient){}
  toview:any;
  cartvalue:any;
  name:string;
  //user registration
  createUser(userObj:object):Observable<any>{
  return   this.hc.post("/user/register",userObj)
  }
  createUser1(userObj:object):Observable<any>{
    return   this.hc.post("/user/activity",userObj)
    }

    loginUser(userCredObj:object):Observable<any>{
      console.log("service")
      console.log(userCredObj)
      return   this.hc.post("/user/login",userCredObj)
    }

  createactivity(useractivityObj:object):Observable<any>{
    return this.hc.post("/user/activity",useractivityObj)
  }

  getproduct(userId: string):Observable<any>{
    return this.hc.get("/cart/getproduct/"+userId);
  }

  deleteproduct(userId: string):Observable<any>{
    return this.hc.delete("/cart/deleteproduct/"+userId);
  }

  changepassword(obj:any):Observable<any>{
    return this.hc.post("/user/forgetpassword",obj);
  }

  addproduct(obj:object):Observable<any>{
    return this.hc.post("/admin/products",obj)
  }
  tocart(obj:object):Observable<any>{
    return this.hc.post("/cart/addto",obj)
  }

  getcourse():Observable<any>{
    return this.hc.get("/admin/getcourses")
  }

  getproducts():Observable<any>{
    return this.hc.get("/admin/getproducts")
  }

  myOrder(product:object):Observable<any>{
    return this.hc.post("/myorder/addto",product);
 }
 mylist(product:object):Observable<any>{
  return this.hc.post("/wishlist/addto",product);
}
viewlist(userId: string):Observable<any>{
  return this.hc.get("/wishlist/viewlist/"+userId);
}
vieworders(userId: string):Observable<any>{
  return this.hc.get("/myorders/vieworder/"+userId);
}


  getbook(category: string):Observable<any>{
    return this.hc.get("/admin/getbooks/"+category );
  }

  getOneBook(bookId:string){
    console.log(bookId);
    return this.hc.get("/admin/onebook/"+bookId)
  }


editBook(obj:object):Observable<any>{
  return this.hc.put("/admin/updatebook",obj)
 }

 deleteBook(obj:object):Observable<any>{
   console.log("from delete product",obj)
   return this.hc.post("/admin/removebook",obj)
 }

 setmyname(name:string){
   this.name=name;
   console.log("setmyname"+this.name);
 }

 getmyname(){
   return this.name;
 }

  viewOrder(userId:string):Observable<any>{
    return this.hc.get("/myorder/vieworder/"+userId);
  }

  userProfile(userId:string):Observable<any>{
      return this.hc.get("/user/profile/"+userId)
  }

}
