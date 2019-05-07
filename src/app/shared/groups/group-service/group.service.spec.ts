import {TestBed} from '@angular/core/testing';

import {GroupService} from './group.service';
import {Group} from '../../../entities/group';
import {type} from '../../../entities/item';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';
import {Subject} from 'rxjs';


const responseMessage = 'Successfully added user to group';
const group: Group[] = [{type: type.event, name: 'EnGruppe', id: 'id123', items: null}];


describe('GroupService', () => {
  let service: GroupService;
  let thenStub: any;
  let catchStub: any;
  let authServiceStub: any;
  let authenticationService: AuthenticationService;
  beforeEach(() => {

    authServiceStub = jasmine.createSpyObj('AuthService', ['getToken']);
    thenStub = jasmine.createSpyObj('Then', ['then']);
    catchStub = jasmine.createSpyObj('Catch', ['catch']);
    authServiceStub.getToken.and.returnValue(thenStub);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService,
        {provide: AuthenticationService, useValue: authServiceStub}
      ],
    });
    service = TestBed.get(GroupService);
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('Should call Get Http Options and thereafter the getToken from auth service', () => {
    spyOn(service, 'getHttpOptions');
    service.getHttpOptions();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

  it('Should call GetToken from the service', () => {
    thenStub.then.and.returnValue(catchStub);
    service.getHttpOptions();
    expect(authenticationService.getToken).toHaveBeenCalled();
  });

  it('Should get Token value from response', () => {
    const sub = new Subject();
    thenStub.then.and.returnValue(new Promise(resolve => {
      sub.next();
      return '123';
    }));
    spyOn(service.httpOptions.headers, 'set');
    service.getHttpOptions();
    const subscription = sub.subscribe( next => {
      expect(service.httpOptions.headers.set).toHaveBeenCalled();
      subscription.unsubscribe();
    });
  });

  it('Should return a promise from AddUserToGroup', () => {
    const promiseEmpty = new Promise((resolve, reject) => {
    });

    spyOn(service, 'addUserToGroup').and.returnValue(promiseEmpty);
    const promise = service.addUserToGroup(group[0], '123@easv.dk');
    expect(promise).toEqual(promiseEmpty);
    expect(service.addUserToGroup).toHaveBeenCalled();
  });


});
