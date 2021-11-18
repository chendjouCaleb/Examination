import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
      <div class="d-flex align-items-center justify-content-between">
          <div class="ms-fontWeight-semibold ms-fontSize-24">Années scolaires</div>
          <div>
              
          </div>
      </div>`
})
export class LevelYearPage {
  level: Level;

  constructor(items: CurrentItems,
              public _router: Router ) {
    this.level = items.get('level');
  }


}
