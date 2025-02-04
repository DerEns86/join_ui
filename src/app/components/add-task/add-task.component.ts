import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private taskService: TaskService = inject(TaskService);

  public categories: String[] = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
  ];

  addTaskForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['MEDIUM'],
    dueDate: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.addTaskForm.value);
    this.taskService.addTask(this.addTaskForm.value);
  }
}
