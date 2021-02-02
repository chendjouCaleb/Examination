import {Injectable} from "@angular/core";

import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";
import {Examination, School} from "examination/entities";

import {ExaminationHttpClient, UserHttpClient} from "examination/models/http";
import {Loader} from "../loader";
import {SchoolLoader} from "../organisation";



@Injectable({providedIn: "root"})
export class ExaminationLoader extends Loader<Examination, number> {

  constructor(private _examinationHttpClient: ExaminationHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _schoolLoader: SchoolLoader) {
    super(_examinationHttpClient);
  }

  async load(item: Examination): Promise<Examination> {
    item.school = await this._schoolLoader.loadById(item.schoolId);
    return item;
  }

  async loadById(id: number): Promise<Examination> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySchool(school: School): Promise<void> {
    if(school.examinations) {
      return;
    }
    const examinations = await this._httpClient.listAsync({schoolId: school.id});
    for (const examination of examinations) {
       this.load(examination);
    }

    school.examinations = examinations;
  }
}
