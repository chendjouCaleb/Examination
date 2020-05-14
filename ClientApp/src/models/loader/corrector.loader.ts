import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Corrector} from '../entities';
import {CorrectorHttpClient, UserHttpClient} from '../httpClient';
import {ExaminationLoader} from './examination.loader';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class CorrectorLoader implements EntityLoader<Corrector, number> {

  constructor(private correctorRepository: CorrectorHttpClient,
              private _userHttClient: UserHttpClient,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: Corrector): Promise<Corrector> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.userId);
    }

    item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Corrector> {
    const item = await this.correctorRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Corrector>> {
    const correctors = await this.correctorRepository.listAsync({examinationId: examination.id});
    for (const corrector of correctors) {
      await this.load(corrector);
    }

    return correctors;
  }
}
