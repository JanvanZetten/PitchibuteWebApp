import {async, TestBed} from '@angular/core/testing';

import { HierachyServiceService } from './hierachy-service.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('HierachyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HierachyServiceService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        AngularFireAuthModule
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

    service.displayItems('');

    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
