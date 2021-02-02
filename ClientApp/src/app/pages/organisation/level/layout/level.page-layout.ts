import {Component, Inject} from '@angular/core';
import {Level} from 'examination/entities';
import {Router} from '@angular/router';
import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from 'examination/app/components';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'level.page-layout.html',
  selector: 'app-level-page-layout'
})
export class LevelPageLayout {
  level: Level;

  constructor(public _router: Router, private _items: CurrentItems,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public applicationService: IApplicationService) {
    this.level = this._items.get('level');
  }

  sendApplication() {
    this.applicationService.add({level: this.level});
  }
}
