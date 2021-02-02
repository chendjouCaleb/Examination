import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {Department, ExaminationDepartment, ExaminationSpeciality} from 'examination/entities';

@Injectable()
export class ExaminationSpecialityHttpClient extends GenericHttpClient<ExaminationSpeciality, number> {
  url: string = SERVER_URL + '/examinationSpecialities';

  createFromAny(value: any): ExaminationSpeciality {
    return new ExaminationSpeciality(value);
  }

  addExaminationSpeciality(examinationDepartment: ExaminationDepartment, department: Department): Promise<ExaminationSpeciality> {
    return this.add({departmentId: department.id, examinationDepartmentId: examinationDepartment.id});
  }

}
