import {Component, OnInit} from '@angular/core';
import {List} from '@positon/collections';
import {Department, DepartmentHttpClient, DepartmentLoader, School} from 'examination/models';
import {DepartmentService} from 'examination/app/components/department';
import {Router} from '@angular/router';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'school-departments.page.html'
})
export class SchoolDepartmentPage implements OnInit {
  school: School;
  departments: List<Department>;

  constructor(private currentItems: CurrentItems,
              private _httpClient: DepartmentHttpClient,
              private _departmentService: DepartmentService,
              private _departmentLoader: DepartmentLoader,
              public router: Router) {
    this.school = this.currentItems.get('school');
  }

  async ngOnInit() {
    const departments = await this._httpClient.list({schoolId: this.school.id});
    await this._departmentLoader.loadAll(departments);

    this.departments = departments;
  }

  add() {
    this._departmentService.add(this.school).then(department => {
      if (department) {
        this.router.navigateByUrl(department.url);
      }
    });
  }
}
