import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreComponent } from './pre/pre.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RegisterComponent } from './register/register.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

const routes: Routes = [
  {path:"admin",component:AdminComponent},
  {path:"productdetails",component:ProductdetailsComponent},
  {path:"pre",component:PreComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"cart",component:CartComponent},
  {path:"viewcart",component:ViewcartComponent},
  {path:"viewproducts",component:ViewproductsComponent},
   {path:"",redirectTo:"/pre",pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
