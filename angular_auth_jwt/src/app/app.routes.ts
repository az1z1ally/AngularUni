import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
