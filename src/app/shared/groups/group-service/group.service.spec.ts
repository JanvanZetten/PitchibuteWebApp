import {TestBed} from '@angular/core/testing';

import {GroupService} from './group.service';
import {Group} from '../../../entities/group';
import {type} from '../../../entities/item';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';


const responseMessage = 'Successfully added user to group';
const group: Group[] = [{type: type.event, name: 'EnGruppe', id: 'id123', items: null}];



describe('GroupService', () => {
  let service: GroupService;
  let thenStub: any;
  let authServiceStub: any;
  beforeEach(() => {

    authServiceStub = jasmine.createSpyObj('AuthService', ['getToken']);
    thenStub = jasmine.createSpyObj('Then', ['then']);
    thenStub.then.and.returnValue(responseMessage);

    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [GroupService,
      {provide: AuthenticationService, useValue: authServiceStub}
    ],
  });
    service = TestBed.get(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users and then "add user" and get a response message back',  () => {
    spyOn(service, 'addUserToGroup').and.returnValue(thenStub);
    service.addUserToGroup(group[0], '123@easv.dk').then(response => {
      expect(response).toEqual('Successfully added user to group');
    });
    expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
