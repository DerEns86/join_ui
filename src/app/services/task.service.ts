import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { TaskInterface } from '../models/Task.interface';
import { SubtaskInterface } from '../models/subtask.interface';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  private http: HttpClient = inject(HttpClient);
  private destroy$: Subject<void> = new Subject<void>();

  readonly BASE_URL = environment.API_URL;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTask(task: TaskInterface): Observable<string> {
    return this.http
      .post<TaskInterface>(`${this.BASE_URL}api/tasks`, task)
      .pipe(
        switchMap((data) => {
          console.log(data);
          console.log('TaskId:', data.id);
          return [data.id];
        })
      );
  }

  addSubtask(
    taskId: string,
    subtask: SubtaskInterface
  ): Observable<SubtaskInterface> {
    return this.http.post<SubtaskInterface>(
      `${this.BASE_URL}api/tasks/${taskId}/subtask`,
      subtask
    );
  }

  addTaskWithSubtasks(task: TaskInterface, subtasks: SubtaskInterface[]) {
    this.addTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (taskId) => {
          subtasks.forEach((subtask) => {
            this.addSubtask(taskId, subtask)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (data) => {
                  console.log('Subtask added:', data);
                },
                error: (err) => {
                  console.error('Error adding subtask:', err);
                },
              });
          });
        },
        error: (err) => {
          console.error('Error adding task:', err);
        },
      });
  }
}
