import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConfirmUserComponent } from './auth/confirm-user/confirm-user.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddCompareComponent } from './compare/add-compare/add-compare.component';
import { CompareComponent } from './compare/compare.component';
import { SingleComponent } from './compare/single/single.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: '', component: CompareComponent },
  // { path: '', component: EmployeeComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'single', component: SingleComponent },
  { path: 'add-compare', component: AddCompareComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirm-user', component: ConfirmUserComponent },
  { path: 'edit/:id', component: AddEmployeeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
