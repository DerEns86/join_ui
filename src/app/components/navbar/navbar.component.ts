import { Component, inject } from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  breakpointService: BreakpointService = inject(BreakpointService);
}
