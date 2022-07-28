import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearLevel} from "examination/entities";
import {SemesterLevelHttpClient, YearLevelHttpClient} from "@examination/http";
import {SemesterLevelLoader, YearLevelLoader} from "examination/loaders";

@Component({
  templateUrl: 'YearLevelList.html',
  selector: 'YearLevelList, [YearLevelList], [year-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class YearLevelList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  yearLevels: YearLevel[];

  constructor(private _httpClient: YearLevelHttpClient,
              private _loader: YearLevelLoader) {
  }

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.yearLevels = items.toArray();
  }
}
