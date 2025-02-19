import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-dialog-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-contact.component.html',
  styleUrl: './dialog-contact.component.scss',
})
export class DialogContactComponent {
  public activeModal: NgbActiveModal = inject(NgbActiveModal);
  private contactService: ContactService = inject(ContactService);
  private fb: FormBuilder = inject(FormBuilder);

  contactForm!: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.contactService.addContact(this.contactForm.value);
      this.activeModal.close();
    } else {
    }
  }
}
