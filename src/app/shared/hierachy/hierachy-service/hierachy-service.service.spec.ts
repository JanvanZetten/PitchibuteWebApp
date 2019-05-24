import { AuthenticationService } from './../../authentication/authentication-service/authentication.service';
import { async, TestBed } from '@angular/core/testing';

import { HierachyServiceService } from './hierachy-service.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Item } from 'src/app/entities/item';

describe('HierachyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HierachyServiceService, AuthenticationService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        AngularFireAuthModule,
      ]
    });
  }));


  it('should be created', () => {
    const service: HierachyServiceService = TestBed.get(HierachyServiceService);
    expect(service).toBeTruthy();
  });

  it('should send an http get request that returns an observable item array', () => {
    const service: HierachyServiceService = TestBed.get(HierachyServiceService);
    const http = TestBed.get(HttpClient);
    const promise = new Promise((resolve, reject) => {
    });
    spyOn(http, 'get').and.returnValue(promise);

    service.getChildItemsFromFirebaseFunction([]);

    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('should generate the correct url for an http request', () => {
    const service: HierachyServiceService = TestBed.get(HierachyServiceService);
    const pathAsUri = '/items/one/items/two/items/three/items';
    const pathAsItems = setupArray()
    expect(service.generateStoreUri(pathAsItems)).toBe(pathAsUri);
  });

  function setupArray(): Item[] {
    const itemArray = [];
    const item1 = <Item>{
      id: 'one',
      name: 'item1',
      type: 0
    };
    const item2 = <Item>{
      id: 'two',
      name: 'item2',
      type: 1
    };
    const item3 = <Item>{
      id: 'three',
      name: 'item3',
      type: 2
    };
    itemArray[0] = item1;
    itemArray[1] = item2;
    itemArray[2] = item3;
    return itemArray;
  }
});
