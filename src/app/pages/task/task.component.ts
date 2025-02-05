import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  private http: HttpClient = inject(HttpClient);

  readonly BASE_URL = environment.API_URL;

  public tasksNames: string[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>(`${this.BASE_URL}api/tasks/all`).subscribe((data) => {
      data.forEach((task: { name: string }) => {
        this.tasksNames.push(task.name);
      });
      console.log(data);
    });

    this.http
      .get<any>(`${this.BASE_URL}api/tasks/10/subtasks`)
      .subscribe((data) => {
        console.log('subtask', data);
      });
  }
}
