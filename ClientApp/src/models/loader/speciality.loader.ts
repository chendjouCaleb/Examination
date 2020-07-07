import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Speciality} from '../entities';
import {SpecialityHttpClient, UserHttpClient} from '../httpClient';
import {ExaminationLoader} from './examination.loader';
import {List} from '@positon/collections';
import {Loader} from "./loader";


@Injectable({providedIn: 'root'})
export class SpecialityLoader extends  Loader<Speciality, number> {

  constructor(private specialityRepository: SpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private _examinationLoader: ExaminationLoader) {
    super(specialityRepository);
  }

  async load(item: Speciality): Promise<Speciality> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Speciality> {
    const item = await this.specialityRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Speciality>> {
    const specialitys = await this.specialityRepository.listAsync({examinationId: examination.id});
    for (const speciality of specialitys) {
      await this.load(speciality);
    }

    return specialitys;
  }
}
