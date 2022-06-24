import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterLevelSpeciality, SemesterSpeciality} from "examination/entities";
import {SemesterLevelSpecialityHttpClient} from "@examination/http";
import {SemesterLevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'semester-level-speciality-list.html',
  selector: '[SemesterLevelSpecialityList], [semester-level-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterLevelSpecialityList implements OnInit {
  @Input()
  params: any;

  semesterLevelSpecialities: SemesterLevelSpeciality[];

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  constructor(private _httpClient: SemesterLevelSpecialityHttpClient,
              private _loader: SemesterLevelSpecialityLoader) {}

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);

    await this._loader.loadAll(items.toArray());

    this.semesterLevelSpecialities = items.toArray();
  }
}
