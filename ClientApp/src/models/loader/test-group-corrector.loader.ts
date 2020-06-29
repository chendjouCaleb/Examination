import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {TestLoader} from './test.loader';
import {CorrectorLoader} from './corrector.loader';
import {TestGroupCorrectorHttpClient} from "../httpClient";
import {TestGroup, TestGroupCorrector} from "../entities";
import {TestGroupLoader} from "./test-group.loader";
import {List} from "@positon/collections";


@Injectable({providedIn: 'root'})
export class TestGroupCorrectorLoader implements EntityLoader<TestGroupCorrector, number> {

  constructor(private testGroupCorrectorRepository: TestGroupCorrectorHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _correctorLoader: CorrectorLoader) {
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

  async loadByTestGroup(testGroup: TestGroup): Promise<List<TestGroupCorrector>> {
    const testGroupCorrectors = await this.testGroupCorrectorRepository.listByTestGroup(testGroup);
    for (const item of testGroupCorrectors) {
      await this.load(item);
    }
    return testGroupCorrectors;
  }

}
