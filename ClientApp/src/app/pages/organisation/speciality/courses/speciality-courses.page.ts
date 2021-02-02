import {Component} from "@angular/core";
import {Speciality} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'speciality-courses.page.html'
})
export class SpecialityCoursesPage {
  speciality: Speciality;

  constructor(private currentItems: CurrentItems) {
    this.speciality = this.currentItems.get('speciality');
  }

  async ngOnInit() {

  }
}
