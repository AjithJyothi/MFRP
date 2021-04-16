import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreComponent } from './pre/pre.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'productdetails', component: ProductdetailsComponent},
  {path: 'pre', component: PreComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'viewcart', component: ViewcartComponent},
  {path: 'viewproducts/:bookId', component: ViewproductsComponent},
  {path: 'updateproduct/:bookId', component: UpdateproductComponent},
  {path: 'updateprofile/:userId', component: UpdateprofileComponent},
  {path: 'vieworder', component: VieworderComponent},
   {path: '', redirectTo: '/pre', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
