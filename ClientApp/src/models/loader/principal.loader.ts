import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Principal} from '../entities';
import {PrincipalHttpClient, UserHttpClient} from '../httpClient';
import {ExaminationLoader} from './examination.loader';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class PrincipalLoader implements EntityLoader<Principal, number> {

  constructor(private principalRepository: PrincipalHttpClient,
              private _userHttClient: UserHttpClient,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: Principal): Promise<Principal> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Principal> {
    const item = await this.principalRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Principal>> {
    const principals = await this.principalRepository.listAsync({examinationId: examination.id});
    for (const principal of principals) {
      await this.load(principal);
    }

    return principals;
  }
}
