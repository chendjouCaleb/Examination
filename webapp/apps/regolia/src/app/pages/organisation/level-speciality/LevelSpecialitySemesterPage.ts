import {Component} from "@angular/core";
import {LevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterLevelSpecialityLoader} from "@examination/loaders";

@Component({
  template: `
      <div class="p-2">
          <h3>Semestres</h3>
          <div class="mt-3">
              <SemesterLevelSpecialityList *ngIf="levelSpeciality.semesterLevelSpecialities"
              [items]="levelSpeciality.semesterLevelSpecialities"
              ></SemesterLevelSpecialityList>
          </div>
      </div>`
})
export class LevelSpecialitySemesterPage {
  levelSpeciality: LevelSpeciality;

  constructor(items: CurrentItems,
              private _semesterLoader: SemesterLevelSpecialityLoader,
              public _router: Router ) {
    this.levelSpeciality = items.get('levelSpeciality');
    this._semesterLoader.loadByLevelSpeciality(this.levelSpeciality);
  }
}
