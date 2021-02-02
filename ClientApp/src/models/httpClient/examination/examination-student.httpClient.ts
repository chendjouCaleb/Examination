import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {
  ExaminationDepartment,
  ExaminationLevel,
  ExaminationLevelSpeciality,
  ExaminationSpeciality,
  ExaminationStudent,
  Student
} from 'examination/entities';
import {List} from '@positon/collections';

@Injectable()
export class ExaminationStudentHttpClient extends GenericHttpClient<ExaminationStudent, number> {
  url: string = SERVER_URL + '/examinationStudents';

  createFromAny(value: any): ExaminationStudent {
    return new ExaminationStudent(value);
  }

  listByStudent(student: Student): Promise<List<ExaminationStudent>> {
    return this.list({studentId: student.id});
  }

  listByExaminationLevel(examinationLevel: ExaminationLevel): Promise<List<ExaminationStudent>> {
    return this.list({examinationLevelId: examinationLevel.id});
  }

  listByExaminationLevelSpeciality(examinationLevelSpeciality: ExaminationLevelSpeciality): Promise<List<ExaminationStudent>> {
    return this.list({examinationLevelSpecialityId: examinationLevelSpeciality.id});
  }

  listByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<List<ExaminationStudent>> {
    return this.list({examinationSpecialityId: examinationSpeciality.id});
  }

  listByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<List<ExaminationStudent>> {
    return this.list({examinationDepartmentId: examinationDepartment.id});
  }

  addExaminationStudent(examinationLevel: ExaminationLevel,
                        examinationLevelSpeciality: ExaminationLevelSpeciality,
                        student: Student): Promise<ExaminationStudent> {

    return this.add({
      examinationLevelId: examinationLevel.id,
      examinationLevelSpecialityId: examinationLevelSpeciality.id,
      studentId: student.id
    });
  }

}
