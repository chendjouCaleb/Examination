import {Component, Inject} from "@angular/core";
import {School} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {ISchoolService, SCHOOL_SERVICE_TOKEN, SchoolService} from "@examination/components";

@Component({
  templateUrl: 'SchoolSettings.page.html'
})
export class SchoolSettingsPage {
  school: School;

  constructor(items: CurrentItems, public _router: Router,
              @Inject(SCHOOL_SERVICE_TOKEN) public schoolService: ISchoolService) {
    this.school = items.get('school');
  }


  changeInfo() {
    this.schoolService.edit(this.school);
  }

  async delete() {
    const deleted = await this.schoolService.delete(this.school);
    if (deleted) {
     this._router.navigateByUrl('/').then();
    }
  }
}
