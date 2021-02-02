import {Department, Level, LevelSpeciality, Speciality} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const LEVEL_SERVICE_TOKEN =
  new InjectionToken<ILevelService>('LEVEL_SERVICE_TOKEN');

export interface ILevelService {
  add(department: Department): Promise<Level>;

  delete(level: Level): Promise<boolean>;

  addSpeciality(level: Level, speciality: Speciality): Promise<LevelSpeciality>;

  removeSpeciality(levelSpeciality: LevelSpeciality): Promise<boolean>;

}
