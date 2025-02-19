import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogContactComponent } from '../../components/dialog-contact/dialog-contact.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public contactService: ContactService = inject(ContactService);
  private modalService: NgbModal = inject(NgbModal);

  contacts = this.contactService.contactSig;

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId);
  }

  openModal() {
    const modalRef = this.modalService.open(DialogContactComponent);
  }
}
