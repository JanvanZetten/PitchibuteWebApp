import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  // Getting the template reference from html
  @ViewChild('confirmTemp') public confirmTemp: TemplateRef<any>;
  // Title for the conf dialog.
  @Input() title: string;
  // Is used to send a signal that user has pressed confirm
  @Output() confirmationSignal: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  // Body text.
  @Input() body: string;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.confirmTemp);
  }

  confirm() {
    this.confirmationSignal.emit(true);
    this.modalRef.hide();
  }


}
