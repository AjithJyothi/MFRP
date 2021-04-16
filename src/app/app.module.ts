import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
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
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { SearchPipe } from './search.pipe';
import {NgxSpinnersModule} from 'ngx-spinners';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

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
    ProfileComponent,
    WishlistComponent,
    VieworderComponent,
    UpdateproductComponent,
    SearchPipe,
    UpdateprofileComponent
  ],
  imports: [
    NgxSpinnersModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      closeButton: true
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
