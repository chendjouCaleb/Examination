import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterSpeciality} from "examination/entities";
import {SemesterSpecialityHttpClient} from "@examination/http";
import {SemesterSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'semester-speciality-list.html',
  selector: 'SemesterSpecialityList, [SemesterSpecialityList], [semester-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterSpecialityList implements OnInit {
  @Input()
  params: any;

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  semesterSpecialities: SemesterSpeciality[];

  constructor(private _httpClient: SemesterSpecialityHttpClient,
              private _loader: SemesterSpecialityLoader) {}

  async ngOnInit(): Promise<void> {
    const items = await this._httpClient.listAsync(this.params);
    await this._loader.loadAll(items.toArray());
    this.semesterSpecialities = items.toArray();
  }
}
