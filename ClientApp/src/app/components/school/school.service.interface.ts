import {School} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const SCHOOL_SERVICE_TOKEN =
  new InjectionToken<ISchoolService>('SCHOOL_SERVICE_TOKEN');

export interface ISchoolService {
  add(): Promise<School>;

  delete(school: School): Promise<boolean>;

  edit(school: School): Promise<void>;

  changeImage(school: School): Promise<boolean>;

  changeCoverImage(school: School): Promise<boolean>

  changeIdentifier(school: School): Promise<void>;


}
