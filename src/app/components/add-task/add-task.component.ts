import { Component, inject, OnInit } from '@angular/core';
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
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../models/category.interface';
import { TaskInterface } from '../../models/task.interface';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private taskService: TaskService = inject(TaskService);
  private categoryService: CategoryService = inject(CategoryService);
  breakpointService: BreakpointService = inject(BreakpointService);

  public categories: CategoryInterface[] = [];

  addTaskForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    priority: ['MEDIUM'],
    dueDate: ['', Validators.required],
    subtasks: this.fb.array([]),
    categoryName: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit() {
    const { subtasks, categoryName, ...taskData } = this.addTaskForm.value;

    const task: TaskInterface = {
      ...taskData,
      category: categoryName ? { name: categoryName } : null,
    };

    this.taskService.addTaskWithSubtasks(task, subtasks);
  }

  get subtasks(): FormArray {
    return this.addTaskForm.get('subtasks') as FormArray;
  }

  setPriority(priority: string) {
    this.addTaskForm.patchValue({ priority });
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

  getCategories() {
    return this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }
}
