import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Group, Room, Test, Score} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class ScoreHttpClient extends GenericHttpClient<Score, number> {
  url: string = SERVER_URL + '/scores';


  createFromAny(value: any): Score {
    return new Score(value);
  }


  listByTest(test: Test): Promise<List<Score>> {
    return this.listAsync({testId: test.id});
  }

  listByRoom(room: Room): Promise<List<Score>> {
    return this.listAsync({roomId: room.id});
  }

  listByGroup(group: Group): Promise<List<Score>> {
    return this.listAsync({groupId: group.id});
  }


  addScore(test: Test, group: Group, room: Room): Promise<Score> {
    return this.add({}, {testId: test.id, groupId: group.id, roomId: room.id});
  }


  start(score: Score): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${score.id}/start`, {}).toPromise();
  }

  restart(score: Score): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${score.id}/restart`, {}).toPromise();
  }

  end(score: Score): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${score.id}/end`, {}).toPromise();
  }


  changeRoom(score: Score, room: Room): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${score.id}/room`, {},
      {params: {roomId: room.id.toString()}}).toPromise();
  }


}
