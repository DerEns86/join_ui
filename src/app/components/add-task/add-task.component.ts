import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private taskService: TaskService = inject(TaskService);
  breakpointService: BreakpointService = inject(BreakpointService);

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
    subtasks: this.fb.array([]),
  });

  onSubmit() {
    const { subtasks, ...taskData } = this.addTaskForm.value;
    this.taskService.addTaskWithSubtasks(taskData, subtasks);
  }

  get subtasks(): FormArray {
    return this.addTaskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(
      this.fb.group({
        name: ['', Validators.required],
        isCompleted: [false],
      })
    );
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }
}
