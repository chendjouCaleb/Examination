import {Level, LevelSpeciality, Student, User} from 'examination/entities';
import {InjectionToken} from '@angular/core';
import {StudentAddOptions} from './add/student-add-options';

export const STUDENT_SERVICE_TOKEN =
  new InjectionToken<IStudentService>('STUDENT_SERVICE_TOKEN');



export interface IStudentService {
  addStudent(options: StudentAddOptions): Promise<Student>;

  detailsStudent(student: Student)

  link(student: Student): Promise<User>;

  removeUser(student: Student): Promise<void>;

  changeLevel(student: Student): Promise<boolean>;

  removeLevelSpeciality(student: Student): Promise<boolean>;

  changeSpeciality(student: Student): Promise<boolean>;

  changeRegistrationId(student: Student): Promise<string>;

  deleteStudent(student: Student): Promise<boolean>;

  editStudent(student: Student): Promise<void>;


}
