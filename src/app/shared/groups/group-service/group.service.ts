import { Injectable } from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {Group} from '../../../Entities/group';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: GroupServiceModule
})
export class GroupService {

  constructor(private database: AngularFirestore) { }

  addUserToGroup(group: Group, username: string): Promise<void> {
    const userId = '12345';
    const groupId = 'uOIbfh63rY27JezVCgWa';
    const groupRef = this.database.collection('groups').doc(groupId);
    const newUsers = [];
    newUsers.push(userId);
    return groupRef.set({users: newUsers
      },
      {merge: true}
    );
  }
}
