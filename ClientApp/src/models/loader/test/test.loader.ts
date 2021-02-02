import {Injectable} from '@angular/core';
import {Loader} from "../loader";
import {
  Examination,
  ExaminationDepartment,
  ExaminationLevel,
  ExaminationLevelSpeciality,
  ExaminationSpeciality,
  Test
} from "examination/entities";
import {TestHttpClient, UserHttpClient} from "examination/models/http";
import {CourseLoader, SpecialityLoader} from "../organisation";
import {ExaminationLevelLoader, ExaminationLevelSpecialityLoader} from "../examination";


@Injectable({providedIn: 'root'})
export class TestLoader extends Loader<Test, number> {

  constructor(private testRepository: TestHttpClient,
              private _userHttClient: UserHttpClient,
              private _specialityLoader: SpecialityLoader,
              private _courseLoader: CourseLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader) {
    super(testRepository);
  }

  async load(item: Test): Promise<Test> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (item.courseId) {
      item.course = await this._courseLoader.loadById(item.courseId);
    }

    if (item.examinationLevelId) {
      item.examinationLevel = await this._examinationLevelLoader.loadById(item.examinationLevelId);

    }

    if (item.examinationLevelSpecialityId) {
      item.examinationLevelSpeciality = await this._examinationLevelSpecialityLoader
        .loadById(item.examinationLevelSpecialityId);
    }

    return item;
  }

  async loadById(id: number): Promise<Test> {
    const item = await this.testRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<void> {
    if (examination.tests) {
      return;
    }
    const tests = await this.testRepository.listAsync({examinationId: examination.id});
    examination.tests = tests;
    for (const test of tests) {
      await this.load(test);
    }
  }


  async loadByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<void> {
    if (examinationDepartment.tests) {
      return;
    }
    const tests = await this.testRepository.listAsync({examinationDepartmentId: examinationDepartment.id});
    examinationDepartment.tests = tests;
    for (const test of tests) {
      await this.load(test);
    }
  }


  async loadByExaminationLevel(examinationLevel: ExaminationLevel): Promise<void> {
    if (examinationLevel.tests) {
      return;
    }
    const tests = await this.testRepository.listAsync({examinationLevelId: examinationLevel.id});
    examinationLevel.tests = tests;
    for (const test of tests) {
      await this.load(test);
    }
  }

  async loadByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<void> {
    if (examinationSpeciality.tests) {
      return;
    }
    const tests = await this.testRepository.listAsync({examinationSpecialityId: examinationSpeciality.id});
    examinationSpeciality.tests = tests;
    for (const test of tests) {
      await this.load(test);
    }
  }

  async loadByExaminationLevelSpeciality(examinationLevelSpeciality: ExaminationLevelSpeciality): Promise<void> {
    if (examinationLevelSpeciality.tests) {
      return;
    }
    const tests = await this.testRepository.listAsync({examinationLevelSpecialityId: examinationLevelSpeciality.id});
    examinationLevelSpeciality.tests = tests;
    for (const test of tests) {
      await this.load(test);
    }
  }

}
