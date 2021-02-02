import {Injectable} from '@angular/core';
import {LevelLoader} from './level.loader';
import {List} from '@positon/collections';
import {LevelSpecialityHttpClient, UserHttpClient} from "examination/models/http";
import {Loader} from "../loader";
import {Level, LevelSpeciality, Speciality} from "examination/entities";
import {SpecialityLoader} from "./speciality.loader";


@Injectable({providedIn: 'root'})
export class LevelSpecialityLoader extends Loader<LevelSpeciality, number> {

  constructor(private levelSpecialityRepository: LevelSpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private _levelLoader: LevelLoader,
              private _specialityLoader: SpecialityLoader) {
    super(levelSpecialityRepository);
  }

  async load(item: LevelSpeciality): Promise<LevelSpeciality> {
    item.speciality = await this._specialityLoader.loadById(item.specialityId);
    item.level = await this._levelLoader.loadById(item.levelId);
    return item;
  }

  async loadById(id: number): Promise<LevelSpeciality> {
    const item = await this.levelSpecialityRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByLevel(level: Level): Promise<void> {
    if (level.levelSpecialities) {
      return;
    }
    const items = await this.levelSpecialityRepository.listAsync({levelId: level.id});
    for (const levelSpeciality of items) {
      await this.load(levelSpeciality);
    }
    level.levelSpecialities = items;
  }

  async loadBySpeciality(speciality: Speciality): Promise<void> {
    if (speciality.levelSpecialities) {
      return;
    }

    const items = await this.levelSpecialityRepository.listAsync({specialityId: speciality.id});
    for (const levelSpeciality of items) {
      await this.load(levelSpeciality);
    }

    speciality.levelSpecialities = items;
  }
}
