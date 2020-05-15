import {Injectable} from '@angular/core';
import {Examination, Supervisor} from '../entities';
import {SupervisorHttpClient, UserHttpClient} from '../httpClient';
import {List} from '@positon/collections';
import {ExaminationLoader} from "./examination.loader";
import {EntityLoader} from "./entity-loader.interface";


@Injectable({providedIn: 'root'})
export class SupervisorLoader implements EntityLoader<Supervisor, number> {

  constructor(private supervisorRepository: SupervisorHttpClient,
              private _userHttClient: UserHttpClient,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: Supervisor): Promise<Supervisor> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Supervisor> {
    const item = await this.supervisorRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Supervisor>> {
    const supervisors = await this.supervisorRepository.listAsync({examinationId: examination.id});
    for (const supervisor of supervisors) {
      await this.load(supervisor);
    }

    return supervisors;
  }
}
