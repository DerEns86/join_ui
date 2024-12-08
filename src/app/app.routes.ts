import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { TaskComponent } from '../pages/task/task.component';
import { LayoutComponent } from '../pages/layout/layout.component';

export const routes: Routes = [
  // { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'task', component: TaskComponent },
    ],
  },
];
