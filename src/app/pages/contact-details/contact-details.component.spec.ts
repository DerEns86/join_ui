import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  let contactServiceMock;

  beforeEach(async () => {
    contactServiceMock = jasmine.createSpyObj('ContactService', [
      'getContactById',
    ]);
    await TestBed.configureTestingModule({
      imports: [ContactDetailsComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: 123 }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
