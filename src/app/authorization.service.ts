import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    // get token from localstorage
      const token = localStorage.getItem('token');

      // if token is existed
      if (token)
      {
          // add token to header of request object
          const transformedREqObj = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      // forward req object to backend
          return next.handle(transformedREqObj);
    }

    else{
      // forward req object as it is to back end
      return next.handle(req);
    }
  }
}
