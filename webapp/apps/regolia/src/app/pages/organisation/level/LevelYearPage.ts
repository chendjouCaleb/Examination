import {Component} from "@angular/core";
import {Level, YearLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearLevelLoader} from "examination/loaders";

@Component({
  template: `
    <div class="mt-4">
      <h3>Années scolaires</h3>
      <div class="mt-2 ms-default-grid" YearLevelList [yearLevels]="yearLevels" listStyle="date"></div>
    </div>`
})
export class LevelYearPage {
  level: Level;

  yearLevels: YearLevel[];

  constructor(items: CurrentItems,
              public _yearLevelLoader: YearLevelLoader,
              public _router: Router ) {
    this.level = items.get('level');
    this._yearLevelLoader.loadByLevel(this.level).then(items => this.yearLevels = items);
  }
}
