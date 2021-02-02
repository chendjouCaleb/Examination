import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from "../application.service.interface";
import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department, Level, LevelSpeciality, Application, ApplicationHttpClient, ApplicationLoader} from "examination/models";
import {List} from "@positon/collections";

@Component({
  templateUrl: 'application-list.html',
  selector: 'app-application-list'
})
export class ApplicationList implements OnInit {

  @Input()
  department: Department;

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  constructor(private _applicationLoader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public _applicationService: IApplicationService
  ) {
  }

  async ngOnInit() {
    await this._applicationLoader.loadByDepartment(this.department);
    await this._applicationLoader.loadByLevel(this.level);
    await this._applicationLoader.loadByLevelSpeciality(this.levelSpeciality);
  }

  get applications(): List<Application> {
    if (this.department) {
      return this.department.applications;
    } else if (this.level) {
      return this.level.applications;
    } else if (this.levelSpeciality) {
      return this.levelSpeciality.applications;
    }
  }

}
