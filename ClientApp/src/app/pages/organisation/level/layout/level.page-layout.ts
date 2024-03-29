﻿import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Level} from 'examination/entities';
import {Router} from '@angular/router';
import {
  IApplicationService,
  LEVEL_SERVICE_TOKEN,
  LevelService,
  STUDENT_APPLICATION_SERVICE_TOKEN
} from 'examination/app/components';
import {CurrentItems} from 'examination/app/current-items';
import {LevelSpecialityLoader} from 'examination/loaders';
import {PreviousLocation} from 'examination/controls';
import {MsPivot} from "@ms-fluent/components";

@Component({
  templateUrl: 'level.page-layout.html',
  selector: 'app-level-page-layout'
})
export class LevelPageLayout implements OnInit, AfterViewInit {
  level: Level;

  @ViewChild(MsPivot)
  pivot: MsPivot;

  constructor(public _router: Router, private _items: CurrentItems,
              private _lastUrl: PreviousLocation,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(LEVEL_SERVICE_TOKEN) public levelService: LevelService,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public applicationService: IApplicationService) {
    this.level = this._items.get('level');
  }

  ngOnInit(): void {
    console.log('Last url: ' + this._lastUrl.previousUrl);
    this._levelSpecialityLoader.loadByLevel(this.level);
  }

  ngAfterViewInit(): void {}

  sendApplication() {
    this.applicationService.add({level: this.level});
  }

  delete() {
    this.levelService.delete(this.level).then(deleted => {
      if (deleted) {
        this._router.navigateByUrl(`${this.level.department.url}`).then();
      }
    })
  }
}
