import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskInterface } from '../../models/task.interface';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Status } from '../../models/enums/status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private taskService: TaskService = inject(TaskService);

  private destroy$ = new Subject<void>();

  Status = Status;

  tasks: TaskInterface[] = [];
  pending: TaskInterface[] = [];
  inProgress: TaskInterface[] = [];
  awaitingFeedback: TaskInterface[] = [];
  done: TaskInterface[] = [];

  ngOnInit(): void {
    this.taskService.tasks$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.tasks = data;
        this.pending = this.tasks.filter(
          (task) =>
            Status[task.status as unknown as keyof typeof Status] ===
            Status.PENDING
        );
        this.inProgress = this.tasks.filter(
          (task) =>
            Status[task.status as unknown as keyof typeof Status] ===
            Status.IN_PROGRESS
        );
        this.awaitingFeedback = this.tasks.filter(
          (task) =>
            Status[task.status as unknown as keyof typeof Status] ===
            Status.AWAITING_FEEDBACK
        );
        this.done = this.tasks.filter(
          (task) =>
            Status[task.status as unknown as keyof typeof Status] ===
            Status.DONE
        );
        console.log('tasks: ', this.tasks);
      },
    });
  }

  drop(event: CdkDragDrop<TaskInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('Event Data:', event.previousContainer.data);
      console.log('Previous Index:', event.previousIndex);

      const task = event.previousContainer.data[event.previousIndex];

      console.log('Gefundene Task:', task);
      console.log('Task ID:', task?.id);

      // Default-Wert für newStatus setzen
      let newStatus: Status = Status.PENDING;

      // Bestimmen, in welche Spalte das Task verschoben wurde
      switch (event.container.id) {
        case 'inProgressList':
          newStatus = Status.IN_PROGRESS;
          break;
        case 'awaitingFeedbackList':
          newStatus = Status.AWAITING_FEEDBACK;
          break;
        case 'doneList':
          newStatus = Status.DONE;
          break;
        case 'pendingList':
        default:
          newStatus = Status.PENDING;
          break;
      }

      // Status des Tasks aktualisieren
      task.status = newStatus;

      // Element in die neue Liste verschieben
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Status in der Datenbank speichern
      console.log('Task:', +task.id, 'Status:', task.status);
    }
  }
}
