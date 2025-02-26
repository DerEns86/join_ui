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

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [ReactiveFormsModule],
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
}
