import {Component, Input, OnInit} from "@angular/core";
import {School} from "examination/entities";
import {YearHttpClient} from "examination/models/http";
import {YearLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearList.html',
  selector: 'YearList, [year-list], [YearList]'
})
export class YearList  implements  OnInit{
  @Input()
  school: School;

  constructor(private yearHttpClient: YearHttpClient,
              private yearLoader : YearLoader) {}

  async ngOnInit() {
    const years = await this.yearLoader.loadBySchool(this.school);
  }
}
