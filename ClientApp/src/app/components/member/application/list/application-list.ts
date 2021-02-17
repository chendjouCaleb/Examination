import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from '../application.service.interface';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  Application,
  ApplicationHttpClient,
  ApplicationLoader,
  Department,
  Level,
  LevelSpeciality,
  School
} from 'examination/models';
import {List} from '@positon/collections';
import {MsPaginatorItemsFn, MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'application-list.html',
  selector: 'app-application-list'
})
export class ApplicationList implements OnInit {
  @Input()
  department: Department;

  @Input()
  school: School;

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  @ViewChild(MsTable)
  table: MsTable;

  applications: Application[] = [];

  _isLoaded: boolean = false;

  itemsFn: MsPaginatorItemsFn<Application> = (page: number, size: number) => {
    return Promise.resolve(this.applications.slice(page * size, page * size + size));
  };

  constructor(private _applicationLoader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public _applicationService: IApplicationService
  ) {
  }

  async ngOnInit() {
    await this._applicationLoader.loadByDepartment(this.department);
    await this._applicationLoader.loadByLevel(this.level);
    await this._applicationLoader.loadByLevelSpeciality(this.levelSpeciality);
    await this._applicationLoader.loadBySchool(this.school);

    this.applications = this.applicationList.toArray();
    this._isLoaded = true;
  }

  get applicationList(): List<Application> {
    if (this.school) {
      return this.school.applications;
    }
    if (this.department) {
      return this.department.applications;
    } else if (this.level) {
      return this.level.applications;
    } else if (this.levelSpeciality) {
      return this.levelSpeciality.applications;
    }
  }

  deleteApplication(item: Application) {
    this._applicationService.delete(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }

}
