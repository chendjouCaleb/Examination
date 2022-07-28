import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterSpeciality} from "examination/models";

@Component({
  templateUrl: 'SemesterSpecialityHome.page.html',
})
export class SemesterSpecialityHomePage implements OnInit {
  semesterSpeciality : SemesterSpeciality;

  get params(): any { return {semesterSpecialityId: this.semesterSpeciality.id}; }

  constructor(items: CurrentItems, public _router: Router) {
    this.semesterSpeciality = items.get('semesterSpeciality');
  }

  ngOnInit() { }
}
