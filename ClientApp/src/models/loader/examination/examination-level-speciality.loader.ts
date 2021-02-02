import {Injectable} from "@angular/core";

import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";

import {ExaminationLevel, ExaminationLevelSpeciality, ExaminationSpeciality} from "examination/entities";
import {ExaminationLevelSpecialityHttpClient, UserHttpClient} from "examination/models/http";
import {Loader} from "../loader";
import {ExaminationSpecialityLoader} from "./examination-speciality.loader";
import {LevelSpecialityLoader} from "../organisation";
import {ExaminationLevelLoader} from "./examination-level.loader";


@Injectable({providedIn: "root"})
export class ExaminationLevelSpecialityLoader extends Loader<ExaminationLevelSpeciality, number> {

  constructor(private httpClient: ExaminationLevelSpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader) {
    super(httpClient);
  }

  async load(item: ExaminationLevelSpeciality): Promise<ExaminationLevelSpeciality> {
    item.levelSpeciality = await this._levelSpecialityLoader.loadById(item.levelSpecialityId);
    item.examinationLevel = await this._examinationLevelLoader.loadById(item.examinationLevelId);
    item.examinationSpeciality = await this._examinationSpecialityLoader.loadById(item.examinationSpecialityId);
    return item;
  }

  async loadById(id: number): Promise<ExaminationLevelSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExaminationLevel(examinationLevel: ExaminationLevel): Promise<void> {
    if (examinationLevel.examinationLevelSpecialities) {
      return;
    }
    const items = await this._httpClient.listAsync({examinationLevelId: examinationLevel.id});
    examinationLevel.examinationLevelSpecialities = items;
    for (const item of items) {
      await this.load(item);
    }
  }


  async loadByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<void> {
    if (examinationSpeciality.examinationLevelSpecialities) {
      return;
    }
    const items = await this._httpClient.listAsync({examinationSpecialityId: examinationSpeciality.id});
    examinationSpeciality.examinationLevelSpecialities = items;
    for (const item of items) {
      await this.load(item);
    }
  }
}
