import {Component, Inject} from "@angular/core";
import {Speciality} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {SPECIALITY_SERVICE_TOKEN, ISpecialityService} from "@examination/components";

@Component({
  templateUrl: 'SpecialitySettings.page.html'
})
export class SpecialitySettingsPage {
  speciality: Speciality;

  constructor(items: CurrentItems, public _router: Router,
              @Inject(SPECIALITY_SERVICE_TOKEN) public specialityService: ISpecialityService) {
    this.speciality = items.get('speciality');
  }

  async delete() {
    const deleted = await this.specialityService.delete(this.speciality);

    if(deleted) {
      this._router.navigateByUrl(this.speciality.department.url).then();
    }
  }
}
