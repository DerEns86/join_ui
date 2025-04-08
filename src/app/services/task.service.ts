import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { TaskInterface } from '../models/task.interface';
import { SubtaskInterface } from '../models/subtask.interface';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { TaskRequestInterface } from '../models/taskRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  private http: HttpClient = inject(HttpClient);
  private destroy$: Subject<void> = new Subject<void>();

  readonly BASE_URL = environment.API_URL;

  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTasks(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${this.BASE_URL}api/tasks/all`);
  }

  loadTasks() {
    this.http
      .get<TaskInterface[]>(`${this.BASE_URL}api/tasks/all`)
      .subscribe((tasks) => {
        this.tasksSubject.next(tasks);
      });
  }

  createTask(task: TaskRequestInterface) {
    this.http
      .post<TaskRequestInterface>(`${this.BASE_URL}api/tasks`, task)
      .subscribe({
        next: (task) => {
          console.log(task);
        },
      });
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

  updateTaskStatus(taskId: string, status: string): Observable<TaskInterface> {
    return this.http.patch<TaskInterface>(
      `${this.BASE_URL}api/tasks/${taskId}`,
      { status }
    );
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    return this.http
      .put<TaskInterface>(`${this.BASE_URL}api/tasks/${task.id}`, task)
      .pipe(tap(() => this.loadTasks()));
  }

  updateSubtask(
    taskId: string,
    subtaskId: number,
    subtask: SubtaskInterface
  ): Observable<SubtaskInterface> {
    return this.http.put<SubtaskInterface>(
      `${this.BASE_URL}api/tasks/${taskId}/subtask/${subtaskId}`,
      subtask
    );
  }

  getSubtasks(taskId: string): Observable<SubtaskInterface[]> {
    return this.http.get<SubtaskInterface[]>(
      `${this.BASE_URL}api/tasks/${taskId}/subtasks`
    );
  }

  deleteSubtask(subtaskId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}api/tasks/subtask/${subtaskId}`
    );
  }
}
