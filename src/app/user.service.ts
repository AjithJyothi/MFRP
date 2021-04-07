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

  getproduct(username: string):Observable<any>{
    return this.hc.get("/cart/getproduct/"+username);
  }

  deleteproduct(username: string):Observable<any>{
    return this.hc.delete("/cart/deleteproduct/"+username);
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
viewlist(username: string):Observable<any>{
  return this.hc.get("/wishlist/viewlist/"+username);
}
vieworders(username: string):Observable<any>{
  return this.hc.get("/myorders/vieworder/"+username);
}


  getbook(category: string):Observable<any>{
    return this.hc.get("/admin/getbooks/"+category );
  }




  viewOrder(username:string):Observable<any>{
    return this.hc.get("/myorder/vieworder/"+username);
  }

}
