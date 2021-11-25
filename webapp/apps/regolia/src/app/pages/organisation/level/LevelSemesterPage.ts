import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterLevelLoader} from "@examination/loaders";

@Component({
  template: `
      <div class="p-2">
          <h2>Semestres</h2>
          <div class="mt-2" *ngIf="level.semesterLevels">
              <SemesterLevelList [items]="level.semesterLevels"></SemesterLevelList>
          </div>
      </div>`
})
export class LevelSemesterPage {
  level: Level;

  constructor(items: CurrentItems,
              private loader: SemesterLevelLoader,
              public _router: Router ) {
    this.level = items.get('level');

    this.loader.loadByLevel(this.level);
  }
}
