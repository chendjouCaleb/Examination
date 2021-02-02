import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {Department, Examination, ExaminationDepartment} from 'examination/entities';

@Injectable()
export class ExaminationDepartmentHttpClient extends GenericHttpClient<ExaminationDepartment, number> {
  url: string = SERVER_URL + '/examinationDepartments';

  createFromAny(value: any): ExaminationDepartment {
    return new ExaminationDepartment(value);
  }

  addExaminationDepartment(examination: Examination, department: Department ): Promise<ExaminationDepartment> {
    return this.add(  {departmentId: department.id, examinationId: examination.id});
  }

}
