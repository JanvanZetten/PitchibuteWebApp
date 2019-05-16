import { Item, type } from './../../../entities/item';
import { TestBed, async } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';


describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const testToken = 'greatToken';

  beforeEach(async(() => {
    let authenticationServiceMock = jasmine.createSpyObj('AuthenticationService', ['getToken']);
    authenticationServiceMock.getToken.and.returnValue(new Promise((resolve, reject) => {
      resolve(testToken);
    }));

    TestBed.configureTestingModule({
      providers: [FileUploadService, { provide: AuthenticationService, useValue: authenticationServiceMock }],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule
      ]
    });
  }));

  it('should be created', () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    expect(service).toBeTruthy();
  });

  it('should make path with the item ids', () => {
    const itemArray: Item[] = [
      { id: 'outermostId', name: 'someName', type: type.group },
      { id: 'secondId', name: 'someName', type: type.event },
      { id: 'secondToLastId', name: 'someName', type: type.folder },
      { id: 'lastId', name: 'someName', type: type.folder },
    ]

    const fileName = 'theFilename'
    const uniqueId = "SomeVeryUniqueID"
    const exspectetPathOutput = itemArray[0].id + '/' + itemArray[1].id + '/' + itemArray[2].id + '/' + itemArray[3].id + '/'
    const service: FileUploadService = TestBed.get(FileUploadService);
    const theFile = { name: fileName, size: 1, slice: null, lastModified: null, type: null }

    const fireStorage = TestBed.get(AngularFireStorage)
    const firestore = TestBed.get(AngularFirestore)
    const fireStorageRefrence: AngularFireStorageReference =
    {
      getDownloadURL: null,
      getMetadata: null,
      delete: null,
      child: null,
      updateMetatdata: null,
      put: (data, meteData) => { return null },
      putString: null
    }

    spyOn(firestore, 'createId').and.returnValue(uniqueId)
    spyOn(fireStorage, 'ref').and.returnValue(fireStorageRefrence)
    spyOn(fireStorageRefrence, 'put').and.returnValue(of({}).toPromise())

    const meta = { originalName: fileName, path: exspectetPathOutput, token: testToken }

    const observable = service.upload(itemArray, theFile).pipe(first()).subscribe(() => {
      expect(fireStorageRefrence.put).toHaveBeenCalledWith(theFile, { customMetadata: meta })
      observable.unsubscribe()
    })
  })

  it('should throw error if the path is not set',
    () => {
      const itemArray = new Array<Item>();

      const service: FileUploadService = TestBed.get(FileUploadService);
      
      service.upload(itemArray, null).subscribe(() => {
        fail('Did not throw expected error');
      }, error => {
        expect(error.message).toBe('Missing Path');
      });
      service.upload(null, null).subscribe(() => {
        fail('Did not throw expected error');
      }, error => {
        expect(error.message).toBe('Missing Path');
      });
      service.upload(undefined, null).subscribe(() => {
        fail('Did not throw expected error');
      }, error => {
        expect(error.message).toBe('Missing Path');
      });
    });

  it('should throw error if one of the parantpath items is a file', () => {
    const itemArray: Item[] = [
      { id: 'outermostId', name: 'someName', type: type.group },
      { id: 'secondId', name: 'someName', type: type.event },
      { id: 'secondToLastId', name: 'someName', type: type.folder },
      { id: 'lastId', name: 'someName', type: type.file },
    ]

    const service: FileUploadService = TestBed.get(FileUploadService);


    service.upload(itemArray, null).subscribe(() => {
      fail('Did not throw expected error');
    }, error => {
      expect(error.message).toBe("Can't place a file here, check the structure and id's")
    })
  })

  it('should throw error if one of the parantpath items is a link', () => {
    const itemArray: Item[] = [
      { id: 'outermostId', name: 'someName', type: type.group },
      { id: 'secondId', name: 'someName', type: type.event },
      { id: 'secondToLastId', name: 'someName', type: type.folder },
      { id: 'lastId', name: 'someName', type: type.link },
    ]

    const service: FileUploadService = TestBed.get(FileUploadService);

    service.upload(itemArray, null).subscribe(() => {
      fail('Did not throw expected error');
    }, error => {
      expect(error.message).toBe("Can't place a file here, check the structure and id's")
    });
  })

  it('should call put on the firestorage refrence when a file should be uploaded', () => {
    const itemArray: Item[] = [
      { id: 'outermostId', name: 'someName', type: type.group },
      { id: 'secondId', name: 'someName', type: type.event },
      { id: 'secondToLastId', name: 'someName', type: type.folder },
      { id: 'lastId', name: 'someName', type: type.folder },
    ]

    const service: FileUploadService = TestBed.get(FileUploadService);
    const theFile = { name: '', size: 1, slice: null, lastModified: null, type: null }

    const fireStorage = TestBed.get(AngularFireStorage)
    const firestore = TestBed.get(AngularFirestore)
    const fireStorageRefrence: AngularFireStorageReference =
    {
      getDownloadURL: null,
      getMetadata: null,
      delete: null,
      child: null,
      updateMetatdata: null,
      put: (data, meteData) => { return null },
      putString: null
    }

    spyOn(firestore, 'createId').and.returnValue('uniqueId')
    spyOn(fireStorage, 'ref').and.returnValue(fireStorageRefrence)
    spyOn(fireStorageRefrence, 'put').and.returnValue(of({}).toPromise())

    const observable = service.upload(itemArray, theFile).pipe(first()).subscribe(() => {
      expect(fireStorageRefrence.put).toHaveBeenCalledTimes(1)
      observable.unsubscribe()
    })
  })

  it('should return a file refrence with an id', () => {
    const itemArray: Item[] = [
      { id: 'outermostId', name: 'someName', type: type.group },
      { id: 'secondId', name: 'someName', type: type.event },
      { id: 'secondToLastId', name: 'someName', type: type.folder },
      { id: 'lastId', name: 'someName', type: type.folder },
    ]
    const theId = 'uniqueId'
    const service: FileUploadService = TestBed.get(FileUploadService)
    const theFile = { name: 'SomeName', size: 1, slice: null, lastModified: null, type: null }

    const fireStorage = TestBed.get(AngularFireStorage)
    const firestore = TestBed.get(AngularFirestore)
    const fireStorageRefrence: AngularFireStorageReference =
    {
      getDownloadURL: null,
      getMetadata: null,
      delete: null,
      child: null,
      updateMetatdata: null,
      put: (data, meteData) => { return null },
      putString: null
    }

    spyOn(firestore, 'createId').and.returnValue(theId)
    spyOn(fireStorage, 'ref').and.returnValue(fireStorageRefrence)
    spyOn(fireStorageRefrence, 'put').and.returnValue(of({}).toPromise())

    const observable = service.upload(itemArray, theFile).pipe(first()).subscribe(output => {
      expect(output).toBeDefined()
      expect(output.id).toBe(theId)
      observable.unsubscribe()
    })
  })
});
