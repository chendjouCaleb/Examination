import {Injectable} from "@angular/core";
import {AuthorizationManager} from "examination/app/authorization";

import {Examination, ExaminationDepartment, ExaminationSpeciality, Speciality} from "examination/entities";
import {ExaminationSpecialityHttpClient, UserHttpClient} from "examination/models/http";

import {ExaminationDepartmentLoader} from "./examination-department.loader";
import {Loader} from "../loader";
import {SpecialityLoader} from "../organisation";


@Injectable({providedIn: "root"})
export class ExaminationSpecialityLoader extends Loader<ExaminationSpeciality, number> {

  constructor(private httpClient: ExaminationSpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              private _specialityLoader: SpecialityLoader) {
    super(httpClient);
  }

  async load(item: ExaminationSpeciality): Promise<ExaminationSpeciality> {
    item.speciality = await this._specialityLoader.loadById(item.specialityId);
    item.examinationDepartment = await this._examinationDepartmentLoader.loadById(item.examinationDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<ExaminationSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySpeciality(speciality: Speciality): Promise<void> {
    if (speciality.examinationSpecialities) {
      return;
    }

    speciality.examinationSpecialities = await this._httpClient.listAsync({specialityId: speciality.id});
    for (const examinationSpeciality of speciality.examinationSpecialities) {
      await this.load(examinationSpeciality);
    }
  }

  async loadByExamination(examination: Examination): Promise<void> {
    if (examination.examinationSpecialities) {
      return;
    }
    const specialities = await this._httpClient.listAsync({examinationId: examination.id});
    examination.examinationSpecialities = specialities;
    for (const item of specialities) {
      item.examination = examination;
      await this.load(item);
    }
  }

  async loadByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<void> {
    if (examinationDepartment.examinationSpecialities) {
      return;
    }
    const specialities = await this._httpClient.listAsync({examinationDepartmentId: examinationDepartment.id});
    examinationDepartment.examinationSpecialities = specialities;
    for (const item of specialities) {
      item.examinationDepartment = examinationDepartment;
      await this.load(item);
    }
  }
}
