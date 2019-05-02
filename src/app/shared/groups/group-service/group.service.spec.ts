import {TestBed} from '@angular/core/testing';

import {GroupService} from './group.service';
import {Group} from '../../../entities/group';
import {type} from '../../../entities/item';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from '../../../../environments/environment';


const responseMessage = of('Successfully added user to group');
const group: Group[] = [{type: type.event, name: 'EnGruppe', id: 'id123', items: null}];
const data = of(group);



describe('GroupService', () => {
  let service: GroupService;
  let angularFirestore: AngularFirestore;
  let angularFireStoreStubSpy: any;
  let documentStub: any;
  let getStub: any;
  let pipeStub: any;
  let subscribeStub: any;
  beforeEach(() => {

    angularFireStoreStubSpy = jasmine.createSpyObj('AngularFireStore', ['collection']);
    documentStub = jasmine.createSpyObj('Document', ['doc']);
    getStub = jasmine.createSpyObj('Get', ['get']);
    pipeStub = jasmine.createSpyObj('pipe', ['pipe']);
    subscribeStub = jasmine.createSpyObj('Subscribe', ['subscribe']);
    angularFireStoreStubSpy.collection.and.returnValue(documentStub);
    documentStub.doc.and.returnValue(getStub);
    getStub.get.and.returnValue(pipeStub);
    pipeStub.pipe.and.returnValue(subscribeStub);

    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [GroupService,
      {provide: AngularFirestore, useValue: angularFireStoreStubSpy},
    ],
  });
    service = TestBed.get(GroupService);
    angularFirestore = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users and then "add user" and get a response message back', () => {


     service.addUserToGroup(group[0], '123@easv.dk').subscribe( response => {
        expect(response).toEqual('Successfully added user to group');
    });
     expect(angularFirestore.collection).toHaveBeenCalled();

    spyOn(service, 'addUserToGroup').and.returnValue(responseMessage);
    service.addUserToGroup(group[0], '123@easv.dk').subscribe( response => {
      expect(response).toEqual('Successfully added user to group');
    });
     expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
