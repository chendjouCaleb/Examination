import {Component} from "@angular/core";
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterSpecialityLoader} from "@examination/loaders";

@Component({
  template: `
      <div class="p-2">
          <h2>Semestres</h2>
          <div *ngIf="speciality.semesterSpecialities" class="mb-2">
              <SemesterSpecialityList [items]="speciality.semesterSpecialities"></SemesterSpecialityList>
          </div>
      </div>`
})
export class SpecialitySemesterPage {
  speciality: Speciality;

  constructor(items: CurrentItems,
              private semesterLoader: SemesterSpecialityLoader,
              public _router: Router ) {
    this.speciality = items.get('speciality');

    this.semesterLoader.loadBySpeciality(this.speciality);
  }
}
