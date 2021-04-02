import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { PreComponent } from './pre/pre.component';
import { AuthorizationService } from './authorization.service';
import { CartComponent } from './cart/cart.component';
import { VieworderComponent } from './vieworder/vieworder.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ViewproductsComponent,
    ViewcartComponent,
    ProductdetailsComponent,
    HomeComponent,
    PreComponent,
    CartComponent,
    VieworderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
