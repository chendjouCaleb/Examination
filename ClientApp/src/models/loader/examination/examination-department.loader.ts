import {Injectable} from '@angular/core';

import {List} from '@positon/collections';
import {AuthorizationManager} from 'examination/app/authorization';

import {Department, Examination, ExaminationDepartment} from 'examination/entities';
import {ExaminationDepartmentHttpClient, UserHttpClient} from 'examination/models/http';

import {ExaminationLoader} from './examination.loader';
import {Loader} from '../loader';
import {DepartmentLoader} from '../organisation';


@Injectable({providedIn: 'root'})
export class ExaminationDepartmentLoader extends Loader<ExaminationDepartment, number> {

  constructor(private _departmentHttpClient: ExaminationDepartmentHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _examinationLoader: ExaminationLoader,
              private _departmentLoader: DepartmentLoader) {
    super(_departmentHttpClient);
  }

  async load(item: ExaminationDepartment): Promise<ExaminationDepartment> {
    item.department = await this._departmentLoader.loadById(item.departmentId);
    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<ExaminationDepartment> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<List<ExaminationDepartment>> {
    const examinationDepartments = await this._httpClient.listAsync({departmentId: department.id});
    for (const examinationDepartment of examinationDepartments) {
      await this.load(examinationDepartment);
    }

    return examinationDepartments;
  }

  async loadByExamination(examination: Examination): Promise<void> {
    if (examination.examinationDepartments) {
      return;
    }
    const departments = await this._httpClient.listAsync({examinationId: examination.id});
    for (const item of departments) {
      this.load(item);
      item.examination = examination;
    }
    examination.examinationDepartments = departments;
  }
}
