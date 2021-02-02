import {Injectable} from '@angular/core';

import {TestLoader} from './test.loader';

import {TestGroupLoader} from "./test-group.loader";
import {List} from "@positon/collections";
import {TestGroup, TestGroupSecretary} from "examination/entities";
import {Loader} from "../loader";
import {TestGroupSecretaryHttpClient} from "examination/models/http";
import {SecretaryLoader} from "../member";



@Injectable({providedIn: 'root'})
export class TestGroupSecretaryLoader extends Loader<TestGroupSecretary, number> {

  constructor(private testGroupSecretaryRepository: TestGroupSecretaryHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _secretaryLoader: SecretaryLoader) {
    super(testGroupSecretaryRepository);
  }

  async load(item: TestGroupSecretary): Promise<TestGroupSecretary> {

    if (item.secretaryId) {
      item.secretary = await this._secretaryLoader.loadById(item.secretaryId);
    }

    if (item.testGroupId) {
      item.testGroup = await this._testGroupLoader.loadById(item.testGroupId);
    }

    return item;
  }

  async loadById(id: number): Promise<TestGroupSecretary> {
    const item = await this.testGroupSecretaryRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTestGroup(testGroup: TestGroup): Promise<List<TestGroupSecretary>> {
    if(testGroup.testGroupSecretaries){
      return testGroup.testGroupSecretaries;
    }
    testGroup.testGroupSecretaries = await this.testGroupSecretaryRepository.listByTestGroup(testGroup);
    for (const item of testGroup.testGroupSecretaries) {
      await this.load(item);
    }
    return testGroup.testGroupSecretaries;
  }

}
