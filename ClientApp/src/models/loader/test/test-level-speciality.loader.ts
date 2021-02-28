import {Injectable} from '@angular/core';

import {Loader} from '../loader';
import {
  CourseLevelSpeciality,
  ExaminationLevelSpeciality,
  ExaminationSpeciality,
  Test,
  TestLevelSpeciality
} from 'examination/entities';
import {TestLevelSpecialityHttpClient, UserHttpClient} from 'examination/models/http';
import {TestLoader} from './test.loader';
import { LevelSpecialityLoader} from '../organisation';
import {ExaminationLevelSpecialityLoader} from '../examination';
import {CourseLevelSpecialityLoader} from '../course';


@Injectable({providedIn: 'root'})
export class TestLevelSpecialityLoader extends Loader<TestLevelSpeciality, number> {

  constructor(private testLevelSpecialityRepository: TestLevelSpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private _testLoader: TestLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader,
              private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader) {
    super(testLevelSpecialityRepository);
  }

  async load(item: TestLevelSpeciality): Promise<TestLevelSpeciality> {
    item.courseLevelSpeciality = await this._courseLevelSpecialityLoader.loadById(item.courseLevelSpecialityId);
    item.examinationLevelSpeciality = await this._examinationLevelSpecialityLoader.loadById(item.examinationLevelSpecialityId);
    item.test = await this._testLoader.loadById(item.testId);
    return item;
  }

  async loadById(id: number): Promise<TestLevelSpeciality> {
    const item = await this.testLevelSpecialityRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTest(test: Test): Promise<void> {
    if (test.testLevelSpecialities) {
      return;
    }
    const items = await this.testLevelSpecialityRepository.listAsync({testId: test.id});
    for (const testLevelSpeciality of items) {
      await this.load(testLevelSpeciality);
    }
    test.testLevelSpecialities = items;
  }

  async loadByExaminationLevelSpeciality(examinationLevelSpeciality: ExaminationLevelSpeciality): Promise<void> {
    if (examinationLevelSpeciality.testLevelSpecialities) {
      return;
    }

    const items = await this.testLevelSpecialityRepository.listAsync(
      {examinationLevelSpecialityId: examinationLevelSpeciality.id}
    );
    examinationLevelSpeciality.testLevelSpecialities = items;

    for (const testExaminationLevelSpeciality of items) {
      await this.load(testExaminationLevelSpeciality);
    }
  }

  async loadByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<void> {
    if (examinationSpeciality.testLevelSpecialities) {
      return;
    }

    const items = await this.testLevelSpecialityRepository.listAsync(
      {examinationSpecialityId: examinationSpeciality.id}
    );
    examinationSpeciality.testLevelSpecialities = items;

    for (const item of items) {
      item.examinationSpeciality = examinationSpeciality;
      await this.load(item);
    }
  }


  async loadByCourseLevelSpeciality(courseLevelSpeciality: CourseLevelSpeciality): Promise<void> {
    if (courseLevelSpeciality.testLevelSpecialities) {
      return;
    }

    const items = await this.testLevelSpecialityRepository.listAsync(
      {courseLevelSpecialityId: courseLevelSpeciality.id}
    );
    courseLevelSpeciality.testLevelSpecialities = items;

    for (const testCourseLevelSpeciality of items) {
      await this.load(testCourseLevelSpeciality);
    }
  }
}
