import { Component, inject } from '@angular/core';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private authService: AuthService = inject(AuthService);

  currentUser = this.authService.currentUserSignal();
}
