import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
      <div class="d-flex align-items-center justify-content-between">
          <div class="ms-fontWeight-semibold ms-fontSize-24">Semestres</div>
          <div>
              
          </div>
      </div>`
})
export class LevelSemesterPage {
  level: Level;

  constructor(items: CurrentItems,
              public _router: Router ) {
    this.level = items.get('level');
  }
}
