import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ExaminationLevel} from "examination/entities";
import {ExaminationLevelHttpClient} from "@examination/http";
import {ExaminationLevelLoader} from "examination/loaders";

@Component({
  templateUrl: 'examination-level-list.html',
  selector: 'ExaminationLevelList, [ExaminationLevelList], [examination-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationLevelList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  examinationLevels: ExaminationLevel[];

  constructor(private _httpClient: ExaminationLevelHttpClient,
              private _loader: ExaminationLevelLoader) {
  }

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.examinationLevels = items.toArray();
  }
}
