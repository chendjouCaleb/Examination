import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Group, Room, Test, TestGroup} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class TestGroupHttpClient extends GenericHttpClient<TestGroup, number> {
  url: string = SERVER_URL + '/testGroups';


  createFromAny(value: any): TestGroup {
    return new TestGroup(value);
  }


  listByTest(test: Test): Promise<List<TestGroup>> {
    return this.listAsync({testId: test.id});
  }

  listByRoom(room: Room): Promise<List<TestGroup>> {
    return this.listAsync({roomId: room.id});
  }

  listByGroup(group: Group): Promise<List<TestGroup>> {
    return this.listAsync({groupId: group.id});
  }


  addTestGroup(test: Test, group: Group, room: Room): Promise<TestGroup> {
    return this.add({}, {testId: test.id, groupId: group.id, roomId: room.id});
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


  changeRoom(testGroup: TestGroup, room: Room): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testGroup.id}/room`, {},
      {params: {roomId: room.id.toString()}}).toPromise();
  }


}
