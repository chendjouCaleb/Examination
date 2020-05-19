import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {Speciality} from "examination/models";

@Component({
  templateUrl: 'speciality-students.page.html',
  selector: 'speciality-student-list'
})
export class SpecialityStudentsPage {

  speciality: Speciality;

  constructor(private currentItems: CurrentItems ) {
    this.speciality = currentItems.get('speciality');
  }

}
