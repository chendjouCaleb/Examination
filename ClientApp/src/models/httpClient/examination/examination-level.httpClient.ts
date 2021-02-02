import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {Department, ExaminationDepartment, ExaminationLevel} from 'examination/entities';

@Injectable()
export class ExaminationLevelHttpClient extends GenericHttpClient<ExaminationLevel, number> {
  url: string = SERVER_URL + '/examinationLevels';

  createFromAny(value: any): ExaminationLevel {
    return new ExaminationLevel(value);
  }

  addExaminationLevel(examinationDepartment: ExaminationDepartment, department: Department): Promise<ExaminationLevel> {
    return this.add({departmentId: department.id, examinationDepartmentId: examinationDepartment.id});
  }

}
