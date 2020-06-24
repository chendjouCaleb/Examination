import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Test} from '../entities';
import {TestHttpClient, UserHttpClient} from '../httpClient';
import {ExaminationLoader} from './examination.loader';
import {List} from '@positon/collections';
import {SpecialityLoader} from './speciality.loader';
import {RoomLoader} from './room.loader';


@Injectable({providedIn: 'root'})
export class TestLoader implements EntityLoader<Test, number> {

  constructor(private testRepository: TestHttpClient,
              private _userHttClient: UserHttpClient,
              private _specialityLoader: SpecialityLoader,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: Test): Promise<Test> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (item.specialityId) {
      item.speciality = await this._specialityLoader.loadById(item.specialityId);
    }


    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Test> {
    const item = await this.testRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Test>> {
    const tests = await this.testRepository.listAsync({examinationId: examination.id});
    for (const test of tests) {
      await this.load(test);
    }

    return tests;
  }

}
