import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearSpeciality} from "examination/entities";
import {YearSpecialityHttpClient} from "@examination/http";
import {YearSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearSpecialityList.html',
  selector: 'YearSpecialityList, [YearSpecialityList], [year-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class YearSpecialityList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  yearSpecialities: YearSpeciality[];

  constructor(private _httpClient: YearSpecialityHttpClient,
              private _loader: YearSpecialityLoader) {}

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.yearSpecialities = items.toArray();
  }
}
