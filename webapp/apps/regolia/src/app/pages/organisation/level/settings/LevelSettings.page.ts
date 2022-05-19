import {Component, Inject} from "@angular/core";
import {Level} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {LEVEL_SERVICE_TOKEN, ILevelService} from "@examination/components";

@Component({
  templateUrl: 'LevelSettings.page.html'
})
export class LevelSettingsPage {
  level: Level;

  constructor(items: CurrentItems, public _router: Router,
              @Inject(LEVEL_SERVICE_TOKEN) public levelService: ILevelService) {
    this.level = items.get('level');
  }

  async delete() {
    const deleted = await this.levelService.delete(this.level);

    if(deleted) {
      this._router.navigateByUrl(this.level.department.url).then();
    }
  }
}
