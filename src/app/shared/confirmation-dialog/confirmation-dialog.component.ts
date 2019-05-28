import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  // Title for the conf dialog.
  @Input() title: string;
  // Is used to send a signal that user has pressed confirm
  @Output() confirmationSignal: EventEmitter<any> = new EventEmitter();
  // Body text.
  @Input() body: string;
  @Input() show: Boolean;
  @Input() errorMessage: string;
  @Input() loading: Boolean;

  // Is used to send a signal that user has pressed close
  @Output() closeSignal: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  openModal() {
  }

  closeModal() {
    this.closeSignal.emit(true);
  }

  confirm() {
    this.confirmationSignal.emit(true);
  }


}
