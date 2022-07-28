import {Component} from "@angular/core";
import {LevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <CourseLevelSpecialityList
      [hiddenColumns]="['level']"
      [params]="{levelSpecialityId: levelSpeciality.id}"></CourseLevelSpecialityList>
  `
})
export class LevelSpecialityCoursesPage {
  levelSpeciality: LevelSpeciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.levelSpeciality = items.get('levelSpeciality');
  }
}
