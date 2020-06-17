import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Paper} from '../entities';
import {PaperHttpClient, UserHttpClient} from '../httpClient';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';
import {TestGroupLoader} from "./test-group.loader";
import {TestGroupCorrectorLoader} from "./test-group-corrector.loader";
import {TestGroupSupervisorLoader} from "./test-group-supervisor.loader";
import {TestGroupSecretaryLoader} from "./test-group-secretary.loader";
import {StudentLoader} from "./student.loader";

@Injectable({providedIn: 'root'})
export class PaperLoader implements EntityLoader<Paper, number> {

  constructor(private paperRepository: PaperHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader,
              private _testGroupLoader: TestGroupLoader,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader,
              private _studentLoader: StudentLoader,
              private _groupLoader: GroupLoader) {
  }

  async load(item: Paper): Promise<Paper> {

    if (item.testGroupId) {
      item.testGroup = await this._testGroupLoader.loadById(item.testGroupId);
    }

    if (item.studentId) {
      item.student = await this._studentLoader.loadById(item.studentId);
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
    return item;
  }

  async loadById(id: number): Promise<Paper> {
    const item = await this.paperRepository.findAsync(id);
    await this.load(item);
    return item;
  }


}
