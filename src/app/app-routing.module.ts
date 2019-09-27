import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {SignupComponent} from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: '', component: MenuComponent },
  {path: 'home', component: HomeComponent, },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: EmployeesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
