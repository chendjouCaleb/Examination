import {Component, Input, OnInit} from "@angular/core";
import {Department} from "examination/entities";
import {SpecialityService} from "examination/app/components";
import {LevelSpecialityLoader, SpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'department-specialities.html',
  selector: 'app-department-specialities'
})
export class DepartmentSpecialities implements OnInit {
  @Input()
  department: Department;

  constructor(public service: SpecialityService,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _specialityLoader: SpecialityLoader) {
  }

  async ngOnInit()  {
     await this._specialityLoader.loadByDepartment(this.department);

    for(const speciality of this.department.specialities) {
       await this._levelSpecialityLoader.loadBySpeciality(speciality);
    }
  }
}
