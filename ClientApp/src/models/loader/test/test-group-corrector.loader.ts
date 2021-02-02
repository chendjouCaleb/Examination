import {Injectable} from '@angular/core';
import {TestLoader} from './test.loader';

import {TestGroupLoader} from "./test-group.loader";
import {List} from "@positon/collections";
import {TestGroup, TestGroupCorrector} from "examination/entities";
import {Loader} from "../loader";
import {TestGroupCorrectorHttpClient} from "examination/models/http";
import {CorrectorLoader} from "../member";


@Injectable({providedIn: 'root'})
export class TestGroupCorrectorLoader extends Loader<TestGroupCorrector, number> {

  constructor(private testGroupCorrectorRepository: TestGroupCorrectorHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _correctorLoader: CorrectorLoader) {
    super(testGroupCorrectorRepository);
  }

  async load(item: TestGroupCorrector): Promise<TestGroupCorrector> {

    if (item.correctorId) {
      item.corrector = await this._correctorLoader.loadById(item.correctorId);
    }

    if (item.testGroupId) {
      item.testGroup = await this._testGroupLoader.loadById(item.testGroupId);
    }

    return item;
  }

  async loadById(id: number): Promise<TestGroupCorrector> {
    const item = await this.testGroupCorrectorRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTestGroup(testGroup: TestGroup): Promise<void> {
    if(testGroup.testGroupCorrectors) {
      return;
    }
    testGroup.testGroupCorrectors = await this.testGroupCorrectorRepository.listByTestGroup(testGroup);
    for (const item of testGroup.testGroupCorrectors) {
      await this.load(item);
    }
  }

}
