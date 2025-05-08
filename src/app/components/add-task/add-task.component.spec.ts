import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  let taskServiceMock;
  let categoryServiceMock;

  beforeEach(async () => {
    categoryServiceMock = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    taskServiceMock = jasmine.createSpyObj('TaskService', ['createTask']);

    categoryServiceMock.getCategories.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [AddTaskComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TaskService, useValue: taskServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
