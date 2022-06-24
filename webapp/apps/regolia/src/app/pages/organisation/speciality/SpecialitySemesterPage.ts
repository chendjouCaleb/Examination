import {Component} from "@angular/core";
import {SemesterSpeciality, Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterSpecialityLoader} from "@examination/loaders";

@Component({
  template: `
      <div class="p-3">
          <h2>Semestres</h2>
          <div *ngIf="speciality.semesterSpecialities" class="mb-2">
            <div class="mt-2 ms-default-grid" SemesterSpecialityList [semesterSpecialities]="semesterSpecialities"
                 listStyle="date"></div>
          </div>
      </div>`
})
export class SpecialitySemesterPage {
  speciality: Speciality;
  semesterSpecialities: SemesterSpeciality[];

  constructor(items: CurrentItems,
              private semesterLoader: SemesterSpecialityLoader,
              public _router: Router ) {
    this.speciality = items.get('speciality');

    this.semesterLoader.loadBySpeciality(this.speciality).then(items => this.semesterSpecialities = items);
  }
}
