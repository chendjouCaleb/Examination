import {Component} from "@angular/core";
import {LevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearLevelSpecialityLoader} from "examination/loaders";

@Component({
  template: `
      <div class="p-3">
          <h3>Années scolaires</h3>
          <div class="mt-3">
              <YearLevelSpecialityList [items]="levelSpeciality.yearLevelSpecialities"></YearLevelSpecialityList>
          </div>
      </div>`
})
export class LevelSpecialityYearPage {
  levelSpeciality: LevelSpeciality;

  constructor(items: CurrentItems,
              public _yearLevelSpecialityLoader: YearLevelSpecialityLoader,
              public _router: Router ) {
    this.levelSpeciality = items.get('levelSpeciality');

    this._yearLevelSpecialityLoader.loadByLevelSpeciality(this.levelSpeciality);
  }


}
