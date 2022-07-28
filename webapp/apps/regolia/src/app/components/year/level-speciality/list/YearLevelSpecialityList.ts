import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearLevelSpeciality} from "examination/entities";
import {YearLevelSpecialityHttpClient} from "@examination/http";
import {YearLevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearLevelSpecialityList.html',
  selector: '[YearLevelSpecialityList], [year-level-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class YearLevelSpecialityList implements OnInit {
  @Input()
  params: any;

  yearLevelSpecialities: YearLevelSpeciality[];

  constructor(private _httpClient: YearLevelSpecialityHttpClient,
              private _loader: YearLevelSpecialityLoader) {
  }

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.yearLevelSpecialities = items.toArray();
  }
}
