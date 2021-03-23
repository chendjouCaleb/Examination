import {Injectable} from '@angular/core';

import {TestLoader} from './test.loader';
import {Loader} from '../loader';
import {Test, TestGroup} from 'examination/entities';
import {TestGroupHttpClient, UserHttpClient} from 'examination/models/http';
import {RoomLoader} from '../organisation';

@Injectable({providedIn: 'root'})
export class TestGroupLoader extends Loader<TestGroup, number> {

  constructor(private testGroupRepository: TestGroupHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader) {
    super(testGroupRepository);
  }

  async load(item: TestGroup): Promise<TestGroup> {
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

  async loadByTest(test: Test): Promise<void> {
    if (test.testGroups) {
      return;
    }
    test.testGroups = await this.testGroupRepository.listAsync({testId: test.id});
    for (const testGroup of test.testGroups) {
      await this.load(testGroup);
      testGroup.test = test;
    }
  }

}
