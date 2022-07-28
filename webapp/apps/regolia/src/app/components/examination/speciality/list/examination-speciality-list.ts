import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ExaminationSpeciality} from "examination/entities";
import {ExaminationSpecialityHttpClient} from "@examination/http";
import {ExaminationSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'examination-speciality-list.html',
  selector: 'ExaminationSpecialityList, [ExaminationSpecialityList], [examination-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationSpecialityList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  examinationSpecialities: ExaminationSpeciality[];

  constructor(private _httpClient: ExaminationSpecialityHttpClient,
              private _loader: ExaminationSpecialityLoader) {
  }

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.examinationSpecialities = items.toArray();
  }
}
