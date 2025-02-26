import { Component, computed, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogContactComponent } from '../../components/dialog-contact/dialog-contact.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public contactService: ContactService = inject(ContactService);
  private modalService: NgbModal = inject(NgbModal);

  contacts = this.contactService.contactSig;

  coloredContacts = computed(() =>
    this.contacts().map((contact) => ({
      ...contact,
      color: this.generateRandomColor(),
    }))
  );

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId);
  }

  openModal() {
    const modalRef = this.modalService.open(DialogContactComponent);
  }

  getInitials(firstName: string, secondName: string) {
    return firstName.charAt(0) + secondName.charAt(0);
  }

  generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
