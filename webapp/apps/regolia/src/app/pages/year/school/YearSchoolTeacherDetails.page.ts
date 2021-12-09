import {AfterViewInit, Component} from "@angular/core";
import {YearTeacherHttpClient} from "@examination/models/http";
import {Year, YearTeacher} from "@examination/models/entities";
import {YearTeacherLoader} from "@examination/models/loaders";
import {CurrentItems} from "../../../current-items";
import {YearTeacherService} from "@examination/components";
import {ActivatedRoute} from "@angular/router";

@Component({
  template: `
      <YearTeacherDetails *ngIf="yearTeacher" [returnUrl]="year.url('teachers')" [yearTeacher]="yearTeacher"> </YearTeacherDetails>
  `
})
export class YearSchoolTeacherDetailsPage implements AfterViewInit {
  year: Year;
  yearTeacher: YearTeacher;

  constructor(private _httpClient: YearTeacherHttpClient,
              private currentsItems: CurrentItems,
              private service: YearTeacherService,
              private _route: ActivatedRoute,
              private _loader: YearTeacherLoader) {

    this.year = this.currentsItems.get('year');

    const id = +this._route.snapshot.paramMap.get('yearTeacherId');
    this._loader.loadById(id).then(result => {
      this.yearTeacher = result;
    })
  }

  ngAfterViewInit(): void {

  }
}
