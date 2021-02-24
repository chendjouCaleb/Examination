import {Injectable} from '@angular/core';

import {TestLoader} from './test.loader';

import {TestGroupLoader} from './test-group.loader';
import {TestGroupCorrectorLoader} from './test-group-corrector.loader';
import {TestGroupSupervisorLoader} from './test-group-supervisor.loader';
import {TestGroupSecretaryLoader} from './test-group-secretary.loader';
import {ExaminationStudent, Paper, Test, TestGroup, TestLevelSpeciality} from 'examination/entities';
import {Loader} from '../loader';
import {PaperHttpClient, UserHttpClient} from 'examination/models/http';
import {StudentLoader} from '../member';
import {ExaminationStudentLoader} from '../examination';
import {TestLevelSpecialityLoader} from './test-level-speciality.loader';


@Injectable({providedIn: 'root'})
export class PaperLoader extends Loader<Paper, number> {

  constructor(private paperRepository: PaperHttpClient,
              private _userHttClient: UserHttpClient,
              private _testLoader: TestLoader,

              private _testGroupLoader: TestGroupLoader,
              private _examinationStudentLoader: ExaminationStudentLoader,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader,
              private _studentLoader: StudentLoader ) {

    super(paperRepository);
  }

  async load(item: Paper): Promise<Paper> {

    await this._examinationStudentLoader.load(item.examinationStudent);
    if (item.testGroupId) {
      item.testGroup = await this._testGroupLoader.loadById(item.testGroupId);
    }

    if (item.testId) {
      item.test = await this._testLoader.loadById(item.testId);
    }

    if (item.testGroupSupervisorId) {
      item.testGroupSupervisor = await this._testGroupSupervisorLoader.loadById(item.testGroupSupervisorId);
    }

    if (item.supervisorUserId) {
      item.supervisorUser = await this._userHttClient.findAsync(item.supervisorUserId);
    }

    if (item.collectorUserId) {
      item.collectorUser = await this._userHttClient.findAsync(item.collectorUserId);
    }

    if (item.testGroupCorrectorId) {
      item.testGroupCorrector = await this._testGroupCorrectorLoader.loadById(item.testGroupCorrectorId);
    }

    if (item.correctorUserId) {
      item.correctorUser = await this._userHttClient.findAsync(item.correctorUserId);
    }

    if (item.testGroupSecretaryId) {
      item.testGroupSecretary = await this._testGroupSecretaryLoader.loadById(item.testGroupSecretaryId);
    }

    if (item.secretaryUserId) {
      item.secretaryUser = await this._userHttClient.findAsync(item.secretaryUserId);
    }

    if (item.testLevelSpecialityId) {
      item.testLevelSpeciality = await this._testLevelSpecialityLoader.loadById(item.testLevelSpecialityId);
    }

    return item;
  }

  async loadById(id: number): Promise<Paper> {
    const item = await this.paperRepository.findAsync(id);
    await this.load(item);
    return item;
  }


  async loadByTestLevelSpeciality(testLevelSpeciality: TestLevelSpeciality): Promise<void> {
    if (testLevelSpeciality.papers) {
      return;
    }
    const papers = await this.paperRepository.listAsync({testLevelSpecialityId: testLevelSpeciality.id});
    testLevelSpeciality.papers = papers;
    for (const paper of papers) {
      await this.load(paper);
      paper.testLevelSpeciality = testLevelSpeciality;
    }
  }

  async loadByTestGroup(testGroup: TestGroup): Promise<void> {
    if (testGroup.papers) {
      return;
    }
    const papers = await this.paperRepository.listAsync({testGroupId: testGroup.id});
    testGroup.papers = papers;
    for (const paper of papers) {
      await this.load(paper);
      paper.testGroup = testGroup;
    }
  }


  async loadByTest(test: Test): Promise<void> {
    if (test.papers) {
      return;
    }
    const papers = await this.paperRepository.listAsync({testId: test.id});
    test.papers = papers;
    for (const paper of papers) {
      await this.load(paper);
      paper.test = test;
    }
  }

  async loadByExaminationStudent(examinationStudent: ExaminationStudent): Promise<void> {
    if (examinationStudent.papers) {
      return;
    }
    const papers = await this.paperRepository.listAsync({examinationStudentId: examinationStudent.id});
    examinationStudent.papers = papers;
    for (const paper of papers) {
      await this.load(paper);
      paper.examinationStudent = examinationStudent;
    }
  }

}
