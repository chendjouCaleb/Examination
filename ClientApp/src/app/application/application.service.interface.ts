import {Application} from "examination/models";
import {InjectionToken} from "@angular/core";


export const STUDENT_APPLICATION_SERVICE_TOKEN =
  new InjectionToken<IApplicationService>('STUDENT_APPLICATION_SERVICE_TOKEN');

export interface IApplicationService {
  edit(application: Application): void;

  removeSpeciality(application: Application): void;

  changeSpeciality(application: Application): void;

  details(application: Application): void;

  reject(application: Application): void;

  accept(application: Application): void;
}
