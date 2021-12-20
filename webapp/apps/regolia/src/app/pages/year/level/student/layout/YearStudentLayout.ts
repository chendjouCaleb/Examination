import {Component} from '@angular/core';
import {YearStudent} from 'examination/entities';
import {CurrentItems} from "../../../../../current-items";
import {YearStudentLoader} from "../../../../../../models/loader/year";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'YearStudentLayout.html',
  selector: 'YearStudentLayout'
})
export class YearStudentLayout {
  yearStudent: YearStudent;

  constructor(currentItems: CurrentItems,
              private activeRoute: ActivatedRoute,
              private loader: YearStudentLoader) {
    const id = +activeRoute.snapshot.paramMap.get('yearStudentId');

    this.loader.loadById(id).then(item => {
      this.yearStudent = item;
    })
  }
}
