import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
