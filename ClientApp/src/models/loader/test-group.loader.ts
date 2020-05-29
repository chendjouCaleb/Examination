import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, TestGroup} from '../entities';
import {TestGroupHttpClient, UserHttpClient} from '../httpClient';
import {List} from '@positon/collections';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';


@Injectable({providedIn: 'root'})
export class TestGroupLoader implements EntityLoader<TestGroup, number> {

  constructor(private testGroupRepository: TestGroupHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader,
              private _groupLoader: GroupLoader) {
  }

  async load(item: TestGroup): Promise<TestGroup> {

    if (item.groupId) {
      item.group = await this._groupLoader.loadById(item.groupId);
    }

    if (item.roomId) {
      item.room = await this._roomLoader.loadById(item.roomId);
    }

    item.test = await this._testLoader.loadById(item.testId);
    return item;
  }

  async loadById(id: number): Promise<TestGroup> {
    const item = await this.testGroupRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<TestGroup>> {
    const testGroups = await this.testGroupRepository.listAsync({examinationId: examination.id});
    for (const testGroup of testGroups) {
      await this.load(testGroup);
    }

    return testGroups;
  }

}
