import {TestBed} from '@angular/core/testing';
import {GroupService} from './group.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';
import {of, Subject} from 'rxjs';
import {Store} from '@ngxs/store';


describe('GroupService', () => {
  let service: GroupService;
  let store: Store;
  let authServiceStub: any;
  let storeStub: any;
  let subscribeStub: any;
  const item = {id: '123', type: 0, name: '123'};
  let authenticationService: AuthenticationService;
  beforeEach(() => {

    authServiceStub = jasmine.createSpyObj('AuthService', ['getToken']);
    storeStub = jasmine.createSpyObj('Store', ['select']);
    subscribeStub = jasmine.createSpyObj('Subscribe', ['subscribe']);
    storeStub.select.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService,
        {provide: AuthenticationService, useValue: authServiceStub},
        {provide: Store, useValue: storeStub}
      ],
    });
    service = TestBed.get(GroupService);
    store = TestBed.get(Store);
    service.path = [item];
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should hit store', () => {
    expect(store.select).toHaveBeenCalled();
  });

  it('Should get Token value from response', () => {
    const sub = new Subject();
    authServiceStub.getToken.and.returnValue(new Promise(resolve => {
      sub.next();
      resolve('123');
    }));

    spyOn(service.httpOptions.headers, 'set');
    service.getHttpOptions();
    const subscription = sub.subscribe(next => {
      expect(service.httpOptions.headers.set).toHaveBeenCalled();
      subscription.unsubscribe();
    });
  });

  it('Should rename item, calling http options', () => {
    spyOn(service, 'getHttpOptions');
    service.renameItem(item, 'null').then();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

  it('Should test add to group', () => {
    spyOn(service, 'getHttpOptions');
    service.addUserToGroup(null, null).then();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

  it('Should call deleteItem and hit httpoptions method', () => {
    spyOn(service, 'getHttpOptions');
    service.deleteItem(item).then();
    expect(service.getHttpOptions).toHaveBeenCalled();
  });

});
