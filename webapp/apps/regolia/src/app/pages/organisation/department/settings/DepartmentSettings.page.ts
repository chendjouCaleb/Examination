import {Component, Inject} from "@angular/core";
import {Department} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {DEPARTMENT_SERVICE_TOKEN, IDepartmentService} from "@examination/components";

@Component({
  templateUrl: 'DepartmentSettings.page.html'
})
export class DepartmentSettingsPage {
  department: Department;

  constructor(items: CurrentItems, public _router: Router,
              @Inject(DEPARTMENT_SERVICE_TOKEN) public departmentService: IDepartmentService) {
    this.department = items.get('department');
  }


  changeInfo() {
    this.departmentService.edit(this.department);
  }

  changePrincipal() {
    this.departmentService.changePrincipal(this.department);
  }

  async delete() {
    const deleted = await this.departmentService.delete(this.department);

    if(deleted) {
      this._router.navigateByUrl(this.department.school.url).then();
    }
  }
}
