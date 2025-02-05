import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http: HttpClient = inject(HttpClient);

  readonly BASE_URL = environment.API_URL;

  addTask(task: any) {
    this.http.post(`${this.BASE_URL}api/tasks`, task).subscribe({
      next: (data) => {
        console.log(data);
        console.log('TaskId:', data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
