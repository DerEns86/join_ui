import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskComponent } from './pages/task/task.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';

export const routes: Routes = [
  // { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: MainComponent },
      { path: 'task', component: TaskComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'contacts/:id', component: ContactDetailsComponent },
    ],
  },
];
