import {TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });

  it('Should console-error as already in list, add modal', () => {
    spyOn(console, 'error');
    const modal = {id: '123', show: false};
    service.modals = [modal];
    service.addModal(modal);
    expect(console.error).toHaveBeenCalled();
  });

  it('Should remove a modal from list', () => {
    const modal = {id: '123', show: false};
    const modal1 = {id: '124', show: false};
    service.modals = [modal, modal1];
    const spy = spyOn(service.modals, 'filter').and.returnValue([modal1]);
    service.remove(modal);
    expect(spy).toHaveBeenCalled();
  });

  it('Should select modal, when calling open modal', () => {
    const modal = {id: '123', show: false};
    const modal1 = {id: '124', show: false};
    service.modals = [modal, modal1];
    const spy = spyOn(service.modals, 'filter').and.returnValue([modal]);
    service.open(modal.id);
    expect(spy).toHaveBeenCalled();
  });
});
