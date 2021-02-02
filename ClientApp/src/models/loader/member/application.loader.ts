import {Injectable} from '@angular/core';

import {Loader} from '../loader';
import {StudentLoader} from './student.loader';
import {Application, Department, Level, LevelSpeciality} from 'examination/entities';
import {AuthorizationManager} from 'examination/app/authorization';
import {ApplicationHttpClient, UserHttpClient} from 'examination/models/http';
import {LevelLoader, LevelSpecialityLoader} from "../organisation";


@Injectable({providedIn: 'root'})
export class ApplicationLoader extends Loader<Application, number> {

  constructor(private _authorization: AuthorizationManager,
              private applicationRepository: ApplicationHttpClient,
              private _userHttClient: UserHttpClient,
              private _studentLoader: StudentLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _levelLoader: LevelLoader) {
    super(applicationRepository);
  }

  async load(item: Application): Promise<Application> {
    if (item.processUserId) {
      item.processUser = await this._userHttClient.findAsync(item.processUserId);
    }

    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.levelSpecialityId) {
      item.levelSpeciality = await this._levelSpecialityLoader.loadById(item.levelSpecialityId);
    }

    if (item.studentId) {
      item.student = await this._studentLoader.loadById(item.studentId);
    }

    if (this._authorization.user && this._authorization.user.id === item.userId) {
      item.isAuthor = true;
    }

    item.level = await this._levelLoader.loadById(item.levelId);
    return item;
  }

  async loadByLevel(level: Level): Promise<void> {
    if (level && !level.applications) {
      const applications = await this.applicationRepository.list({levelId: level.id});
      for (const application of applications) {
        await this.load(application);
        application.level = level;
      }
      level.applications = applications;
    }
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (department && !department.applications) {
      const applications = await this.applicationRepository.list({departmentId: department.id});
      for (const application of applications) {
        await this.load(application);
        application.department = department;
      }
      department.applications = applications;
    }
  }

  async loadByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<void> {
    if (levelSpeciality && !levelSpeciality.applications) {
      const applications = await this.applicationRepository.list({levelSpecialityId: levelSpeciality.id});
      for (const application of applications) {
        await this.load(application);
        application.levelSpeciality = levelSpeciality;
      }
      levelSpeciality.applications = applications;
    }
  }

}
