import {List} from '@positon/collections';
import {Teacher, Department} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const TEACHER_SERVICE_TOKEN =
  new InjectionToken<ITeacherService>('TEACHER_SERVICE_TOKEN');

export interface ITeacherService {
  addTeachers(department: Department): Promise<List<Teacher>>;

  deleteTeacher(teacher: Teacher): Promise<boolean>;
}
