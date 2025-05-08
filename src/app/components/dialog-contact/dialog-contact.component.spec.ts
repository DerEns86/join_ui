import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactComponent } from './dialog-contact.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DialogContactComponent', () => {
  let component: DialogContactComponent;
  let fixture: ComponentFixture<DialogContactComponent>;

  let contactServiceMock;

  beforeEach(async () => {
    contactServiceMock = jasmine.createSpyObj('ContactService', [
      'getContactById',
    ]);
    await TestBed.configureTestingModule({
      imports: [DialogContactComponent],
      providers: [
        NgbActiveModal,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'ContactService', useValue: contactServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
