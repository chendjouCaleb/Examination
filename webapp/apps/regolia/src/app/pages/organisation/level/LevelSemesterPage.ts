import {Component} from "@angular/core";
import {Level, SemesterLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterLevelLoader} from "@examination/loaders";

@Component({
  template: `
    <div class="mt-4">
      <h3>Semestres</h3>
      <div class="mt-2 ms-default-grid" SemesterLevelList [params]="params" listStyle="date"></div>
    </div>`
})
export class LevelSemesterPage {
  level: Level;
  get params(): any { return {levelId: this.level.id}; }

  constructor(items: CurrentItems, public _router: Router ) {
    this.level = items.get('level');
  }
}
