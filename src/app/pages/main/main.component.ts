import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Status } from '../../models/enums/status.enum';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TaskInterface } from '../../models/task.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  private authService: AuthService = inject(AuthService);
  private taskService: TaskService = inject(TaskService);

  Status = Status;

  private destroy$: Subject<void> = new Subject<void>();

  currentUser = this.authService.currentUserSignal();

  tasks: TaskInterface[] = [];
  numberOfTasksInProgress = new BehaviorSubject<number>(0);

  constructor() {}

  ngOnInit(): void {
    this.taskService.tasks$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.tasks = data;
        // this.updateNumberOfTasksInProgress();
        console.log('tasks: ', this.tasks);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get username() {
    if (this.currentUser) {
      return (
        this.currentUser.username.charAt(0).toUpperCase() +
        this.currentUser.username.slice(1)
      );
    }
    return '';
  }

  getNumberOfAllTasks() {
    const tasks = this.tasks;
    return tasks ? tasks.length : 0;
  }

  getNumberOfFilteredTasks(status: Status) {
    const tasks = this.tasks;
    let filteredTasks = tasks.filter(
      (task) => Status[task.status as unknown as keyof typeof Status] === status
    );

    return filteredTasks.length;
  }

  getNumberOfUrgentTasks() {
    const tasks = this.tasks;
    let filteredTasks = tasks.filter((task) => task.priority === 'URGENT');

    return filteredTasks.length;
  }
}
