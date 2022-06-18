import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearLevelLoader} from "examination/loaders";

@Component({
  template: `
    <h3>Années scolaires</h3>
    <div class="mt-3">
      <YearLevelList [yearLevels]="level.yearLevels"></YearLevelList>
    </div>`
})
export class LevelYearPage {
  level: Level;

  constructor(items: CurrentItems,
              public _yearLevelLoader: YearLevelLoader,
              public _router: Router ) {
    this.level = items.get('level');
    this._yearLevelLoader.loadByLevel(this.level);
  }
}
