import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentHttpClient} from 'examination/models/http';

@Component({
  templateUrl: 'department-home.page.html',
  selector: 'app-department-home-page',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['department-home.page.scss']
})
export class DepartmentHomePage implements OnInit {

  @Input()
  department: Department;

  constructor(private _httpClient: DepartmentHttpClient) {}

  async ngOnInit() {
    this.department.statistics = await this._httpClient.statistics(this.department);
  }
}
