import {TestBed} from '@angular/core/testing';

import {GroupService} from './group.service';
import {Group} from '../../../entities/group';
import {type} from '../../../entities/item';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';
import {Subject} from 'rxjs';
import {Store} from '@ngxs/store';


describe('GroupService', () => {
  let service: GroupService;
  let thenStub: any;
  let catchStub: any;
  let authServiceStub: any;
  let storeStub: any;
  let subscribeStub: any;
  let authenticationService: AuthenticationService;
  beforeEach(() => {

    authServiceStub = jasmine.createSpyObj('AuthService', ['getToken']);
    storeStub = jasmine.createSpyObj('Store', ['select']);
    subscribeStub = jasmine.createSpyObj('Subscribe', ['subscribe']);
    storeStub.select.and.returnValue(subscribeStub);
    thenStub = jasmine.createSpyObj('Then', ['then']);
    catchStub = jasmine.createSpyObj('Catch', ['catch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService,
        {provide: AuthenticationService, useValue: authServiceStub},
        {provide: Store, useValue: storeStub}
      ],
    });
    service = TestBed.get(GroupService);
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get Token value from response', () => {
    const sub = new Subject();
    authServiceStub.getToken.and.returnValue(new Promise(resolve => {
      sub.next();
      resolve('123');
    }));

    spyOn(service.httpOptions.headers, 'set');
    service.getHttpOptions();
    const subscription = sub.subscribe( next => {
      expect(service.httpOptions.headers.set).toHaveBeenCalled();
      subscription.unsubscribe();
    });
  });

  it('Should rename item, calling http options', () => {
    spyOn(service, 'getHttpOptions');
    service.renameItem('null', 'null', 'null').then();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

  it('Should test add to group', () => {
    spyOn(service, 'getHttpOptions');
    service.addUserToGroup(null, null).then();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

});
