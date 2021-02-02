import {Component, Inject, Input, OnInit} from "@angular/core";
import {Department, Level} from "examination/entities";
import {LevelLoader, LevelSpecialityLoader} from "examination/loaders";
import {ILevelService, LEVEL_SERVICE_TOKEN} from "examination/app/components";

@Component({
  templateUrl: 'department-levels.html',
  selector: 'app-department-levels'
})
export class DepartmentLevels implements OnInit {
  @Input()
  department: Department;

  constructor(private _levelLoader: LevelLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(LEVEL_SERVICE_TOKEN) public service: ILevelService) {
  }


  async ngOnInit() {
     await this._levelLoader.loadByDepartment(this.department);

    for(const level of this.department.levels) {
      await this._levelSpecialityLoader.loadByLevel(level);
    }
  }

  addLevel() {
    this.service.add(this.department);
  }


  deleteLevel(level: Level) {
    this.service.delete(level);
  }
}
