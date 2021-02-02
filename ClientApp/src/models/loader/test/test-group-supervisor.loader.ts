import {Injectable} from '@angular/core';

import {TestLoader} from './test.loader';

import {TestGroupLoader} from "./test-group.loader";
import {List} from "@positon/collections";
import {Loader} from "../loader";
import {TestGroup, TestGroupSupervisor} from "examination/entities";
import {TestGroupSupervisorHttpClient} from "examination/models/http";
import {SupervisorLoader} from "../member";


@Injectable({providedIn: 'root'})
export class TestGroupSupervisorLoader extends Loader<TestGroupSupervisor, number> {

  constructor(private testGroupSupervisorRepository: TestGroupSupervisorHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _supervisorLoader: SupervisorLoader) {
    super(testGroupSupervisorRepository);
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

  async loadByTestGroup(testGroup: TestGroup): Promise<List<TestGroupSupervisor>> {
    if(testGroup.testGroupSupervisors) {
      return testGroup.testGroupSupervisors;
    }
    testGroup.testGroupSupervisors = await this.testGroupSupervisorRepository.listByTestGroup(testGroup);
    for (const item of testGroup.testGroupSupervisors) {
      await this.load(item);
    }
    return testGroup.testGroupSupervisors;
  }

}
