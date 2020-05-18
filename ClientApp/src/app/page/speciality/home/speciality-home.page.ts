import {Component} from '@angular/core';
import {Speciality} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'speciality-home.page.html',
  selector: 'app-speciality-home'
})
export class SpecialityHomePage {
  speciality: Speciality;

  constructor(currentItems: CurrentItems) {
    this.speciality = currentItems.get('speciality');
  }
}
