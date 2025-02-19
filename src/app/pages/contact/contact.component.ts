import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ContactInterface } from '../../models/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public contactService: ContactService = inject(ContactService);

  contacts = this.contactService.contactSig;

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId);
  }
}
