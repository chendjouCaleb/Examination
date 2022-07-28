import {Component, OnInit} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="mt-4">
      <h3>Examens</h3>
      <div class="mt-2 ms-default-grid" ExaminationLevelList [params]="params" listStyle="date"></div>
    </div>
  `
})
export class LevelExaminationPage implements OnInit {
  level: Level;
  get params(): any { return {levelId: this.level.id}; }


  constructor(items: CurrentItems, public _router: Router) {
    this.level = items.get('level');
  }

  async ngOnInit() {  }
}
