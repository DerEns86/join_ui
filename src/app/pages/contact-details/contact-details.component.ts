import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ContactInterface } from '../../models/contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent implements OnInit {
  private contactService: ContactService = inject(ContactService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);

  contactForm!: FormGroup;

  contactId: number | undefined;
  contact = signal<ContactInterface | null>(null);
  inEditMode = false;

  initials = signal<string>('');
  color = this.generateRandomColor();

  constructor() {
    this.contactForm = this.fb.group({
      firstName: [this.contact()?.firstName],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.contactId = this.activatedRoute.snapshot.params['id'];
    if (this.contactId) {
      this.contactService
        .getContactById(this.contactId)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.contact.set(data);
            this.initials.set(this.getInitials(data.firstName, data.lastName));
            this.contactForm.setValue({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            });
          },
        });
    }
  }

  ngOnInit(): void {
    console.log(this.contactId);
  }

  onSubmit() {}

  getInitials(firstName: string, secondName: string) {
    return firstName.charAt(0) + secondName.charAt(0);
  }

  generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId);
  }
}
