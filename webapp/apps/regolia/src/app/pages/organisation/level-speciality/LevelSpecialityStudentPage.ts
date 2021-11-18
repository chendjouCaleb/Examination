import {Component} from "@angular/core";
import {LevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<app-student-list [levelSpeciality]="levelSpeciality"
                               [hiddenColumns]="['departmentName', 'levelIndex', 'specialityName']"
                               columnsKey="levelStudents"></app-student-list>`
})
export class LevelSpecialityStudentPage {
  levelSpeciality: LevelSpeciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.levelSpeciality = items.get('levelSpeciality');
  }
}
