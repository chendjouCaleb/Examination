import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Room, Test, TestGroup} from 'examination/entities';
import {ItemListResult} from '../itemList';


@Injectable()
export class TestGroupHttpClient extends GenericHttpClient<TestGroup, number> {
  url: string = SERVER_URL + '/testGroups';


  createFromAny(value: any): TestGroup {
    return new TestGroup(value);
  }


  listByTest(test: Test): Promise<ItemListResult<TestGroup>> {
    return this.itemList({testId: test.id});
  }

  listByRoom(room: Room): Promise<ItemListResult<TestGroup>> {
    return this.itemList({roomId: room.id});
  }


  addTestGroup(test: Test, room: Room): Promise<TestGroup> {
    return this.add({}, {testId: test.id, roomId: room.id});
  }


  start(testGroup: TestGroup): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testGroup.id}/start`, {}).toPromise();
  }

  restart(testGroup: TestGroup): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testGroup.id}/restart`, {}).toPromise();
  }

  end(testGroup: TestGroup): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testGroup.id}/end`, {}).toPromise();
  }

}
