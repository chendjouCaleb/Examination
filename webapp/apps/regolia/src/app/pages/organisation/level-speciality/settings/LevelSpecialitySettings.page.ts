import {Component, Inject} from "@angular/core";
import {LevelSpeciality} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {ILevelService, LEVEL_SERVICE_TOKEN, LevelSpecialityService} from "@examination/components";

@Component({
  templateUrl: 'LevelSpecialitySettings.page.html'
})
export class LevelSpecialitySettingsPage {
  levelSpeciality: LevelSpeciality;

  constructor(items: CurrentItems, public _router: Router,
              public service: LevelSpecialityService) {
    this.levelSpeciality = items.get('levelSpeciality');
  }

  async delete() {
    const deleted = await this.service.delete(this.levelSpeciality);

    if(deleted) {
      this._router.navigateByUrl(this.levelSpeciality.level.url).then();
    }
  }
}
