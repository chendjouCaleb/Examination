import {Injectable} from "@angular/core";

import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";

import {Examination, ExaminationDepartment, ExaminationLevel, Level} from "examination/entities";
import {ExaminationLevelHttpClient, UserHttpClient} from "examination/models/http";

import {ExaminationDepartmentLoader} from "./examination-department.loader";
import {Loader} from "../loader";
import {LevelLoader} from "../organisation";


@Injectable({providedIn: "root"})
export class ExaminationLevelLoader extends Loader<ExaminationLevel, number> {

  constructor(private httpClient: ExaminationLevelHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              private _levelLoader: LevelLoader) {
    super(httpClient);
  }

  async load(item: ExaminationLevel): Promise<ExaminationLevel> {
    await this._levelLoader.load(item.level);
    item.examinationDepartment = await this._examinationDepartmentLoader.loadById(item.examinationDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<ExaminationLevel> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByLevel(level: Level): Promise<void> {
    if (level.examinationLevels) {
      return;
    }

    level.examinationLevels = await this._httpClient.listAsync({levelId: level.id});
    for (const examinationLevel of level.examinationLevels) {
      await this.load(examinationLevel);
    }
  }

  async loadByExamination(examination: Examination): Promise<void> {
    if (examination.examinationLevels) {
      return;
    }
    const levels = await this._httpClient.listAsync({examinationId: examination.id});
    examination.examinationLevels = levels;
    for (const item of levels) {
      await this.load(item);
    }
  }

  async loadByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<void> {
    if (examinationDepartment.examinationLevels) {
      return;
    }
    const levels = await this._httpClient.listAsync({examinationDepartmentId: examinationDepartment.id});
    examinationDepartment.examinationLevels = levels;
    for (const item of levels) {
      await this.load(item);
    }
  }
}
