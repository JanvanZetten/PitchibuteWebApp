import { Item, type } from '../../../entities/item';
import { TestBed, async } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';


describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService],
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

    const meta = { originalName: fileName, path: exspectetPathOutput }

    const observable = service.upload(itemArray, theFile).pipe(first()).subscribe(() => {
      expect(fireStorageRefrence.put).toHaveBeenCalledWith(theFile, { customMetadata: meta })
      observable.unsubscribe()
    })
  })
});
