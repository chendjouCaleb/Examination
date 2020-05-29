import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {List} from '@positon/collections';
import {TestLoader} from './test.loader';
import {CorrectorLoader} from './corrector.loader';
import {Examination, TestGroupCorrector, TestGroupCorrectorHttpClient, TestGroupLoader} from 'examination/models';


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

  async loadByExamination(examination: Examination): Promise<List<TestGroupCorrector>> {
    const testGroupCorrectors = await this.testGroupCorrectorRepository.listAsync({examinationId: examination.id});
    for (const testGroupCorrector of testGroupCorrectors) {
      await this.load(testGroupCorrector);
    }

    return testGroupCorrectors;
  }

}
