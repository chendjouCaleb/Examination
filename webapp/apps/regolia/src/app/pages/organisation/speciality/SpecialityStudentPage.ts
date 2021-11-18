import {Component} from "@angular/core";
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<StudentList
          [hiddenColumns]="['departmentName', 'specialityName']" columnsKey="SpecialityStudents"
          [speciality]="speciality"></StudentList>`
})
export class SpecialityStudentPage {
  speciality: Speciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.speciality = items.get('speciality');
  }
}
