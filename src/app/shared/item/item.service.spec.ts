import { IFile } from './../../entities/file';
import { Folder } from './../../entities/folder';
import { Group } from './../../entities/group';
import { Event } from './../../entities/event';
import { HierachyModule } from './../hierachy/hierachy.module';
import { TestBed, async, getTestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Item, type } from 'src/app/entities/item';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HierachyModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        AngularFireAuthModule
      ]
    });
  }));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });

  it('should throw error if olditems is null or empty', () => {
    expect(
      function () {
        ItemService.updateTree(null, [{ name: "Somename", type: type.group }], []);
      }
    ).toThrowError()

    expect(
      function () {
        ItemService.updateTree([], [{ name: "Somename", type: type.group }], []);
      }
    ).toThrowError()
  })

  it('should throw error if path is null or empty', () => {
    expect(
      function () {
        ItemService.updateTree([{ name: "Somename", type: type.group }], null, []);
      }
    ).toThrowError()

    expect(
      function () {
        ItemService.updateTree([{ name: "Somename", type: type.group }], [], []);
      }
    ).toThrowError()
  })

  it('should throw error if the item has a type which can\'t have items', () => {
    expect(
      function () {
        ItemService.updateTree([{ id: "ID", name: "Somename", type: type.file }], [{ id: "ID", name: "Somename", type: type.file }], []);
      }
    ).toThrowError()
  })

  it('should update the tree with the new items', () => {
    const file1: IFile = {
      id: "ID6",
      name: "file1",
      type: type.file,
      url: "www.theURL.com",
      size: 1
    }

    const file2: IFile = {
      id: "ID7",
      name: "file2",
      type: type.file,
      url: "www.theOtherURL.com",
      size: 2
    }
    const oldTree: Item[] = getAnOldTree()
    const path: Item[] = [
      {
        id: "ID1",
        name: "firstGroup",
        type: type.group
      },
      {
        id: "ID3",
        name: "event1",
        type: type.event
      },
      {
        id: "ID5",
        name: "folder1",
        type: type.folder
      }
    ]
    const newItems: Item[] = [file1, file2]
    const expectedOutput: Item[] = getAnUpdatedTree()

    const output = ItemService.updateTree(oldTree, path, newItems)

    //Using toString because they don't have the same object refrence
    expect(output.toString()).toBe(expectedOutput.toString())
  })

  function getAnOldTree(): Item[] {
    const file1: IFile = {
      id: "ID6",
      name: "file1",
      type: type.file,
      url: "www.theURL.com",
      size: 1
    }

    const folder1: Folder = {
      id: "ID5",
      name: "folder1",
      type: type.folder,
      resources: [file1]
    }

    const event1: Event = {
      id: "ID3",
      name: "event1",
      type: type.event,
      start: null,
      end: null,
      resources: [folder1]
    }

    const event2: Event = {
      id: "ID4",
      name: "event2",
      type: type.event,
      start: null,
      end: null,
      resources: []
    }

    let tree: Item[] = [
      {
        id: "ID1",
        name: "firstGroup",
        type: type.group,
        items: [event1, event2]
      } as Group,
      {
        id: "ID2",
        name: "secondGroup",
        type: type.group,
        items: []
      } as Group
    ]
    return tree
  }

  function getAnUpdatedTree(): Item[] {
    const file1: IFile = {
      id: "ID6",
      name: "file1",
      type: type.file,
      url: "www.theURL.com",
      size: 1
    }

    const file2: IFile = {
      id: "ID7",
      name: "file2",
      type: type.file,
      url: "www.theOtherURL.com",
      size: 2
    }

    const folder1: Folder = {
      id: "ID5",
      name: "folder1",
      type: type.folder,
      resources: [file1, file2]
    }

    const event1: Event = {
      id: "ID3",
      name: "event1",
      type: type.event,
      start: null,
      end: null,
      resources: [folder1]
    }

    const event2: Event = {
      id: "ID4",
      name: "event2",
      type: type.event,
      start: null,
      end: null,
      resources: []
    }

    let tree: Item[] = [
      {
        id: "ID1",
        name: "firstGroup",
        type: type.group,
        items: [event1, event2]
      } as Group,
      {
        id: "ID2",
        name: "secondGroup",
        type: type.group,
        items: []
      } as Group
    ]
    return tree
  }
})