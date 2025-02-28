import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Priority } from '../../models/enums/priority.enum';

@Component({
  selector: 'app-priority-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-icon.component.html',
  styleUrl: './priority-icon.component.scss',
})
export class PriorityIconComponent {
  @Input() priority!: Priority;
}
