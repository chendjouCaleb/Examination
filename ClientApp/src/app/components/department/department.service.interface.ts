import {Department, School} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const DEPARTMENT_SERVICE_TOKEN =
  new InjectionToken<IDepartmentService>('DEPARTMENT_SERVICE_TOKEN');

export interface IDepartmentService {
  add(school: School): Promise<Department>;

  delete(department: Department): Promise<boolean>;

  edit(department: Department): Promise<void>;

  changeImage(department: Department): Promise<boolean>;

  changeCoverImage(department: Department): Promise<boolean>

}
