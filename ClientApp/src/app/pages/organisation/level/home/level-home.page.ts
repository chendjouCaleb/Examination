import {Component, Inject, Input} from '@angular/core';
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {ILevelService, LEVEL_SERVICE_TOKEN} from 'examination/app/components';
import {LevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'level-home.page.html',
  selector: 'app-level-home'
})
export class LevelHomePage {
  @Input()
  level: Level;

  constructor(private currentItems: CurrentItems,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(LEVEL_SERVICE_TOKEN) public service: ILevelService) {
  }


}
