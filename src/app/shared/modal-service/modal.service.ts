import {Injectable} from '@angular/core';
import {Modal} from '../../entities/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   modals: Modal[] = [];
  constructor() {
  }

  addModal(modal: Modal) {
   if (modal.id === '' || this.modals.indexOf(modal) !== -1) {
     console.error('Missing ID of modal');
   } else {
     this.modals.push(modal);
   }
  }
  remove(modal: Modal) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== modal.id);
  }

  open(id: string): void {
    // open modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.show = true;
  }

  close(id: string): void {
    // close modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.show = false;
  }

  getBoolean(id: string): Boolean {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    return modal.show;
  }
}
