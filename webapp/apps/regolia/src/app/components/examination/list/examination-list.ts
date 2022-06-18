import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {Examination, ExaminationHttpClient, ExaminationLoader} from 'examination/models';
import {Router} from '@angular/router';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from '../examination.service.contract';
import {MsDialog, MsTable} from '@ms-fluent/components';

@Component({
  selector: '[examination-list], [ExaminationList]',
  templateUrl: './examination-list.html'
})
export class ExaminationList implements OnInit {
  @Input()
  params: any;

  examinations: Examination[] = [];

  isLoading: boolean = true;

  constructor(private currentItems: CurrentItems,
              private _dialog: MsDialog,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService,
              private _examinationLoader: ExaminationLoader,
              private _httpClient: ExaminationHttpClient,
              private _router: Router) {
  }

  async ngOnInit() {
    try {
      const items = await this._httpClient.list(this.params);

      await this._examinationLoader.loadAll(items.toArray());
      this.examinations = items.toArray();
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }

  async add(...items: Examination[]) {
    for(const item of items) {
      await this._examinationLoader.load(item);
    }
  }

}
