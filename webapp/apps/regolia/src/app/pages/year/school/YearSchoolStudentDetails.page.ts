import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {YearStudentHttpClient} from "@examination/models/http";
import {Year, YearStudent} from "@examination/models/entities";
import {YearStudentLoader} from "@examination/models/loaders";
import {CurrentItems} from "../../../current-items";
import {YearStudentList, YearStudentService} from "@examination/components";
import {ActivatedRoute} from "@angular/router";

@Component({
  template: `
      <YearStudentDetails *ngIf="yearStudent" [returnUrl]="year.url('students')" [yearStudent]="yearStudent"> </YearStudentDetails>
  `
})
export class YearSchoolStudentDetailsPage implements AfterViewInit {
  year: Year;
  yearStudent: YearStudent;

  constructor(private _httpClient: YearStudentHttpClient,
              private currentsItems: CurrentItems,
              private service: YearStudentService,
              private _route: ActivatedRoute,
              private _loader: YearStudentLoader) {

    this.year = this.currentsItems.get('year');

    const id = +this._route.snapshot.paramMap.get('yearStudentId');
    this._loader.loadById(id).then(result => {
      this.yearStudent = result;
    })
  }

  ngAfterViewInit(): void {

  }
}
