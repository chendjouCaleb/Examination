import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterLevel} from "examination/entities";
import {SemesterLevelHttpClient, SemesterLevelSpecialityHttpClient} from "@examination/http";
import {SemesterLevelLoader, SemesterLevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'semester-level-list.html',
  selector: 'SemesterLevelList, [SemesterLevelList], [semester-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterLevelList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  semesterLevels: SemesterLevel[];

  constructor(private _httpClient: SemesterLevelHttpClient,
              private _loader: SemesterLevelLoader) {
  }

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);

    await this._loader.loadAll(items.toArray());

    this.semesterLevels = items.toArray();
  }
}
