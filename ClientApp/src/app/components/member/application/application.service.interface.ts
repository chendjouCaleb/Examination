﻿import {Application, Department, Level, LevelSpeciality, School} from "examination/models";
import {InjectionToken} from "@angular/core";

export interface IApplicationLocation {
  school?: School,
  department?: Department,
  level?: Level,
  levelSpeciality?: LevelSpeciality
}

export const STUDENT_APPLICATION_SERVICE_TOKEN =
  new InjectionToken<IApplicationService>('STUDENT_APPLICATION_SERVICE_TOKEN');

export interface IApplicationService {
  edit(application: Application): Promise<void>;

  add(location: IApplicationLocation): Promise<Application>;

  delete(application: Application): Promise<void>

  details(application: Application): void;

  reject(application: Application): Promise<void>;

  accept(application: Application): Promise<void>;
}
