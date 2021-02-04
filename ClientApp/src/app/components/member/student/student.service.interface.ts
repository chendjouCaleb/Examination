import {Level, LevelSpeciality, Student, User} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const STUDENT_SERVICE_TOKEN =
  new InjectionToken<IStudentService>('STUDENT_SERVICE_TOKEN');

export interface IStudentService {
  addStudent(level: Level, levelSpeciality: LevelSpeciality): Promise<Student>;

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
