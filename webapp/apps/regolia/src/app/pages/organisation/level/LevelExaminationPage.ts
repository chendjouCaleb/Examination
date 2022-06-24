import {Component, OnInit} from "@angular/core";
import {ExaminationLevel, Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationLevelLoader} from "examination/loaders";

@Component({
  template: `
    <div class="mt-4">
      <h3>Examens</h3>
      <div class="mt-2 ms-default-grid" *ngIf="examinationLevels"
           ExaminationLevelList [examinationLevels]="examinationLevels" listStyle="date"></div>
    </div>
  `
})
export class LevelExaminationPage implements OnInit {
  level: Level;
  examinationLevels: ExaminationLevel[];


  constructor(items: CurrentItems,
              public _router: Router,
              private _examinationLevelLoader: ExaminationLevelLoader,) {
    this.level = items.get('level');
  }

  async ngOnInit() {
    this.examinationLevels = await this._examinationLevelLoader.loadByLevel(this.level);
  }
}
