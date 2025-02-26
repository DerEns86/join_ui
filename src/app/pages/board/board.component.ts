import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
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
import { SubtaskInterface } from '../../models/subtask.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogEditTaskComponent } from '../../components/dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private taskService: TaskService = inject(TaskService);
  private modalService: NgbModal = inject(NgbModal);

  subtasksMap: Record<string, Observable<SubtaskInterface[]>> = {};

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

        this.tasks.forEach((task) => this.loadSubtasks(task.id));
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

      let newStatus: Status = Status.PENDING;

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

      task.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.updateTaskStatus(task.id, task.status).subscribe({
        next: (data) => {
          console.log('Task updated:', data);
        },
        error: (err) => {
          console.error('Error updating task:', err);
        },
      });
    }
  }

  loadSubtasks(taskId: string): void {
    this.subtasksMap[taskId] = this.taskService.getSubtasks(taskId).pipe(
      catchError((err) => {
        console.error(`Error fetching subtask for task ${taskId}:`, err);
        return of([]);
      })
    );
  }

  calculateProgress(subtasks: SubtaskInterface[]): number {
    if (!subtasks || subtasks.length === 0) {
      return 0;
    }
    const completed = subtasks.filter((s) => s.isCompleted).length;
    return (completed / subtasks.length) * 100;
  }

  getCompletedSubtasks(subtasks: SubtaskInterface[]): number {
    return subtasks ? subtasks.filter((s) => s.isCompleted).length : 0;
  }

  getTotalSubtasks(subtasks: SubtaskInterface[]): number {
    return subtasks ? subtasks.length : 0;
  }

  openEditTaskModal(task: TaskInterface): void {
    const modalRef = this.modalService.open(DialogEditTaskComponent);
    modalRef.componentInstance.task = task;

    modalRef.result.then(
      (result) => {
        if (result) {
          const index = this.tasks.findIndex((t) => t.id === result.id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
        }
      },
      (reason) => {
        console.log('Dismissed:', reason);
      }
    );
  }
}
