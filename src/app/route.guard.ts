import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate(): boolean{

    // check token in local storage
    const token = localStorage.getItem('token');
    // if token is not found, return true
    if (token === undefined){
      alert('Unauthorized access');
      return false;
    }
    // else return true
    return true;
  }

}
