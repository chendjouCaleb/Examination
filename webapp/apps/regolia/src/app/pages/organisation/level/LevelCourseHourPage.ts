import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<CourseHourList [level]="level"></CourseHourList>`
})
export class LevelCourseHoursPage {
  level: Level;

  constructor(items: CurrentItems, public _router: Router) {
    this.level = items.get('level');
  }
}
