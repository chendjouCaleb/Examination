import {Component} from "@angular/core";
import {School} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'school-rooms.page.html'
})
export class SchoolRoomsPage {
  school: School;

  constructor(items: CurrentItems) {
    this.school = items.get('school');
  }
}
