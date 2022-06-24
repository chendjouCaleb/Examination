import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ExaminationLevelSpeciality} from "examination/entities";
import {ExaminationLevelSpecialityHttpClient} from "@examination/http";
import {ExaminationLevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'examination-level-speciality-list.html',
  selector: ' [ExaminationLevelSpecialityList], [examination-level-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationLevelSpecialityList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  examinationLevelSpecialities: ExaminationLevelSpeciality[];

  constructor(private _httpClient: ExaminationLevelSpecialityHttpClient,
              private _loader: ExaminationLevelSpecialityLoader) {}

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);

    await this._loader.loadAll(items.toArray());

    this.examinationLevelSpecialities = items.toArray();
  }
}
