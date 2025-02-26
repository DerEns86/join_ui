import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryInterface } from '../../models/category.interface';
import { TaskInterface } from '../../models/task.interface';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SubtaskInterface } from '../../models/subtask.interface';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-edit-task.component.html',
  styleUrl: './dialog-edit-task.component.scss',
})
export class DialogEditTaskComponent {
  @Input() task!: TaskInterface;

  public activeModal: NgbActiveModal = inject(NgbActiveModal);
  private fb: FormBuilder = inject(FormBuilder);
  private taskService: TaskService = inject(TaskService);
  private categoryService: CategoryService = inject(CategoryService);

  public categories: CategoryInterface[] = [];

  subtasksMap: Record<string, Observable<SubtaskInterface[]>> = {};

  editTaskForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['MEDIUM'],
    dueDate: ['', Validators.required],
    subtasks: this.fb.array([]),
    categoryName: [''],
  });

  ngOnInit(): void {
    this.getCategories();
    this.patchForm();
  }

  patchForm(): void {
    if (this.task) {
      this.editTaskForm.patchValue({
        name: this.task.name,
        description: this.task.description,
        priority: this.task.priority,
        dueDate: this.task.dueDate,
        categoryName: this.task.categoryName || '',
      });
      this.taskService
        .getSubtasks(this.task.id)
        .pipe(
          catchError((err) => {
            console.error(`Error fetching subtasks:`, err);
            return of([]);
          })
        )
        .subscribe((subtasks) => {
          const subtaskArray = this.editTaskForm.get('subtasks') as FormArray;
          subtaskArray.clear();

          subtasks.forEach((subtask) => {
            subtaskArray.push(
              new FormGroup({
                id: new FormControl(subtask.id),
                name: new FormControl(subtask.name, Validators.required),
                isCompleted: new FormControl(subtask.isCompleted),
              })
            );
          });
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

  onSubmit() {
    const { subtasks, categoryName, ...taskData } = this.editTaskForm.value;

    const updatedTask: any = {
      ...this.task,
      ...taskData,
      category: {
        name: categoryName,
      },
      subtasks: subtasks.map((subtask: SubtaskInterface) => ({
        id: subtask.id,
        name: subtask.name,
        isCompleted: subtask.isCompleted,
      })),
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (updatedTaskResponse) => {
        console.log('Task updated:', updatedTaskResponse);
        const taskId = updatedTaskResponse.id;

        subtasks.forEach((subtask: SubtaskInterface) => {
          if (subtask.id) {
            this.taskService
              .updateSubtask(taskId, subtask.id, subtask)
              .subscribe({
                next: (updatedSubtask) =>
                  console.log('Subtask updated:', updatedSubtask),
                error: (err) => console.error('Error updating subtask:', err),
              });
          } else {
            this.taskService.addSubtask(taskId, subtask).subscribe({
              next: (newSubtask) => console.log('Subtask added:', newSubtask),
              error: (err) => console.error('Error adding subtask:', err),
            });
          }
        });

        this.taskService.loadTasks();
      },
      error: (err) => {
        console.error('Error updating task:', err);
      },
    });
  }

  get subtasks(): FormArray {
    return this.editTaskForm.get('subtasks') as FormArray;
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
    const subtaskId = this.subtasks.at(index).get('id')?.value;
    if (subtaskId) {
      this.taskService.deleteSubtask(subtaskId).subscribe({
        next: () => {
          console.log('Subtask deleted:', subtaskId);
          this.subtasks.removeAt(index);
        },
        error: (err) => {
          console.error('Error deleting subtask:', err);
        },
      });
    } else {
      this.subtasks.removeAt(index);
    }
  }

  getCategories() {
    return this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
    });
  }
}
