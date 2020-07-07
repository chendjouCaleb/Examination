import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Secretary} from '../entities';
import {SecretaryHttpClient, UserHttpClient} from '../httpClient';
import {ExaminationLoader} from './examination.loader';
import {List} from '@positon/collections';
import {Loader} from './loader';


@Injectable({providedIn: 'root'})
export class SecretaryLoader extends Loader<Secretary, number> {

  constructor(private secretaryRepository: SecretaryHttpClient,
              private _userHttClient: UserHttpClient,
              private _examinationLoader: ExaminationLoader) {
    super(secretaryRepository);
  }

  async load(item: Secretary): Promise<Secretary> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Secretary> {
    const item = await this.secretaryRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Secretary>> {
    const secretarys = await this.secretaryRepository.listAsync({examinationId: examination.id});
    for (const secretary of secretarys) {
      await this.load(secretary);
    }

    return secretarys;
  }
}
