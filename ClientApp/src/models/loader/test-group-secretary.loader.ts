import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {TestLoader} from './test.loader';
import {SecretaryLoader} from './secretary.loader';
import {TestGroupSecretaryHttpClient} from '../httpClient/test-group-secretary.httpClient';
import {TestGroupSecretary} from "../entities";
import {TestGroupLoader} from "./test-group.loader";


@Injectable({providedIn: 'root'})
export class TestGroupSecretaryLoader implements EntityLoader<TestGroupSecretary, number> {

  constructor(private testGroupSecretaryRepository: TestGroupSecretaryHttpClient,
              private _testGroupLoader: TestGroupLoader,
              private _testLoader: TestLoader,
              private _secretaryLoader: SecretaryLoader) {
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



}
