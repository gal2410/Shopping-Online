import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ProductCardComponent, ShowProductComponent } from './Products/product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SidecartComponent } from './sidecart/sidecart.component';
import {CartService} from './cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { SignupComponent } from './signup/signup.component';
import {OpenDialogService} from './open-dialog.service';
import {FormSubmitService} from './form-submit.service';
import {SessionsService} from './sessions.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import { AboutComponent } from './about/about.component';
import { SearchPipe } from './sidecart/s.pipe';
import { NamePipe } from './sidecart/n.pipe';
import {HighlightPipe} from './sidecart/h.pipe';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { EmployeesComponent } from './employees/employees.component';
import { popComponent } from './checkout/checkout.component';
import { GeneralInformationComponent } from './general-information/general-information.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    NamePipe,
    SearchPipe,
    HighlightPipe,
    AppComponent,
    AboutComponent,
    ProductCardComponent,
    MenuComponent,
    NavbarComponent,
    HomeComponent,
    SidecartComponent,
    ShowProductComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    popComponent,
    GeneralInformationComponent
  ],
  imports: [
    ToasterModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSidenavModule,
    MatSliderModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  entryComponents:[
    ShowProductComponent,
    LoginComponent,
    popComponent
  ],
  providers: [
    CartService,
    OpenDialogService,
    FormSubmitService,
    SessionsService,
    ToasterService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
