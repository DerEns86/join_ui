import { inject, Injectable, signal } from '@angular/core';
import { ContactInterface } from '../models/contact.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http: HttpClient = inject(HttpClient);
  readonly BASE_URL = environment.API_URL;

  contactSig = signal<ContactInterface[]>([]);

  constructor() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<ContactInterface[]>(`${this.BASE_URL}api/contact`).subscribe({
      next: (data) => {
        this.contactSig.set(data);
        console.log(this.contactSig());
      },
    });
  }

  getContacts() {
    return this.contactSig;
  }

  addContact(newContact: ContactInterface) {
    this.http.post(`${this.BASE_URL}api/contact`, newContact).subscribe({
      next: () =>
        this.contactSig.update((contacts) => [...contacts, newContact]),
    });
  }

  deleteContact(contactId: number) {
    this.http.delete(`${this.BASE_URL}api/contact/${contactId}`).subscribe({
      next: () =>
        this.contactSig.update((items) =>
          items.filter((item) => item.id !== contactId)
        ),
    });
  }
}
