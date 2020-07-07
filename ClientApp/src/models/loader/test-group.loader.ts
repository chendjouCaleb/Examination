import {Injectable} from '@angular/core';
import {Test, TestGroup} from '../entities';
import {TestGroupHttpClient, UserHttpClient} from '../httpClient';
import {List} from '@positon/collections';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';
import {Loader} from "./loader";


@Injectable({providedIn: 'root'})
export class TestGroupLoader extends Loader<TestGroup, number> {

  constructor(private testGroupRepository: TestGroupHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader,
              private _groupLoader: GroupLoader) {
    super(testGroupRepository);
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

  async loadByTest(test: Test): Promise<List<TestGroup>> {
    const testGroups = await this.testGroupRepository.listAsync({testId: test.id});
    for (const testGroup of testGroups) {
      await this.load(testGroup);
    }
    return testGroups;
  }

}
