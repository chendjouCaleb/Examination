import {Component} from "@angular/core";
import {Level, SemesterLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterLevelLoader} from "@examination/loaders";

@Component({
  template: `
    <div class="mt-4">
      <h3>Semestres</h3>
      <div *ngIf="semesterLevels"
            class="mt-2 ms-default-grid" SemesterLevelList
           [semesterLevels]="semesterLevels" listStyle="date"></div>
    </div>`
})
export class LevelSemesterPage {
  level: Level;
  semesterLevels: SemesterLevel[];

  constructor(items: CurrentItems,
              private loader: SemesterLevelLoader,
              public _router: Router ) {
    this.level = items.get('level');

    this.loader.loadByLevel(this.level).then(items => this.semesterLevels = items);
  }
}
