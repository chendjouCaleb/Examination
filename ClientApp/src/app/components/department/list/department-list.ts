import {Component, Input, OnInit} from '@angular/core';
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {DepartmentHttpClient} from 'examination/models/http';
import {DepartmentLoader} from 'examination/loaders';
import {Router} from '@angular/router';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {DepartmentService} from '../department.service';
import {AuthorizationManager} from 'examination/app/authorization';

@Component({
  templateUrl: 'department-list.html',
  selector: 'app-department-list'
})
export class DepartmentList implements OnInit {
  @Input()
  school: School;

  constructor(private currentItems: CurrentItems,
              private _httpClient: DepartmentHttpClient,
              private _departmentService: DepartmentService,
              private _departmentLoader: DepartmentLoader,
              public _auth: AuthorizationManager,
              public router: Router) {
  }

  async ngOnInit() {

    AssertHelpers.isNotNull(this.school);
    const departments = await this._httpClient.list({schoolId: this.school.id});
    await this._departmentLoader.loadAll(departments);

    this.school.departments = departments;
  }


  add() {
    this._departmentService.add(this.school).then(department => {
      if (department) {
        this.router.navigateByUrl(department.url);
      }
    });
  }
}
