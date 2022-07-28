import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearLevel} from "examination/models";

@Component({
  templateUrl: 'YearLevelHome.page.html',
})
export class YearLevelHomePage implements OnInit {
  yearLevel: YearLevel;

  get params(): any { return {yearLevelId: this.yearLevel.id}; }

  constructor(items: CurrentItems, public _router: Router) {
    this.yearLevel = items.get('yearLevel');
  }

  async ngOnInit() { }
}
