import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  private http: HttpClient = inject(HttpClient);

  public tasksNames: string[] = [];

  public categories: String[] = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
  ];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get<any>('http://localhost:8080/api/tasks/all')
      .subscribe((data) => {
        data.forEach((task: { name: string }) => {
          this.tasksNames.push(task.name);
        });
        console.log(data);
      });

    this.http
      .get<any>('http://localhost:8080/api/tasks/10/subtasks')
      .subscribe((data) => {
        console.log('subtask', data);
      });
  }
}
