import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTaskComponent } from './dialog-edit-task.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DialogEditTaskComponent', () => {
  let component: DialogEditTaskComponent;
  let fixture: ComponentFixture<DialogEditTaskComponent>;

  let taskServiceMock;
  let categoryServiceMock;

  beforeEach(async () => {
    categoryServiceMock = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    taskServiceMock = jasmine.createSpyObj('TaskService', [
      'getSubtasks',
      'updateTask',
      'deleteSubtask',
    ]);

    categoryServiceMock.getCategories.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [DialogEditTaskComponent],
      providers: [
        NgbActiveModal,
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: 'TaskService', useValue: taskServiceMock },
        { provide: 'CategoryService', useValue: categoryServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
