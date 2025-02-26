import { inject, Injectable, signal } from '@angular/core';
import { ContactInterface } from '../models/contact.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http: HttpClient = inject(HttpClient);
  readonly BASE_URL = environment.API_URL;

  contactSig = signal<ContactInterface[]>([]);
  singleContactSig = signal<ContactInterface | null>(null);

  constructor() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<ContactInterface[]>(`${this.BASE_URL}api/contact`).subscribe({
      next: (data) => {
        this.contactSig.set(data);
      },
    });
  }

  getContacts() {
    return this.contactSig;
  }

  addContact(newContact: ContactInterface) {
    this.http
      .post<ContactInterface>(`${this.BASE_URL}api/contact`, newContact)
      .subscribe({
        next: (response) =>
          this.contactSig.update((contacts) => [...contacts, response]),
      });
  }

  getContactById(contactId: number) {
    return this.http.get<ContactInterface>(
      `${this.BASE_URL}api/contact/${contactId}`
    );
  }

  getSingleContact() {
    return this.singleContactSig;
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
