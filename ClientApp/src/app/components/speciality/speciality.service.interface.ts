import {Department, Level, LevelSpeciality, Speciality} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const SPECIALITY_SERVICE_TOKEN =
  new InjectionToken<ISpecialityService>('SPECIALITY_SERVICE_TOKEN');

export interface ISpecialityService {
  add(department: Department): Promise<Speciality>;

  delete(speciality: Speciality): Promise<boolean>;

  edit(speciality: Speciality): Promise<void>;

  addLevelSpeciality(speciality: Speciality, level: Level): Promise<LevelSpeciality>;

  removeLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<boolean>;

}
