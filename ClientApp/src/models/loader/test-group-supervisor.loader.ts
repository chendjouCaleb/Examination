import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {TestLoader} from './test.loader';
import {SupervisorLoader} from './supervisor.loader';
import {TestGroupLoader, TestGroupSupervisor} from 'examination/models';
import {TestGroupSupervisorHttpClient} from '../httpClient/test-group-supervisor.httpClient';


@Injectable({providedIn: 'root'})
export class TestGroupSupervisorLoader implements EntityLoader<TestGroupSupervisor, number> {

  constructor(private testGroupSupervisorRepository: TestGroupSupervisorHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _supervisorLoader: SupervisorLoader) {
  }

  async load(item: TestGroupSupervisor): Promise<TestGroupSupervisor> {

    if (item.supervisorId) {
      item.supervisor = await this._supervisorLoader.loadById(item.supervisorId);
    }

    if (item.testGroupId) {
      item.testGroup = await this._testGroupLoader.loadById(item.testGroupId);
    }

    return item;
  }

  async loadById(id: number): Promise<TestGroupSupervisor> {
    const item = await this.testGroupSupervisorRepository.findAsync(id);
    await this.load(item);
    return item;
  }



}
