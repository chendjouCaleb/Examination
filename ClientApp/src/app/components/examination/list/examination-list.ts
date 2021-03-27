import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {Examination, ExaminationLoader, School} from 'examination/models';
import {Router} from '@angular/router';
import {MsfModal} from 'fabric-docs';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from '../examination.service.contract';
import {MsTable} from "@ms-fluent/table";

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.html'
})
export class ExaminationList implements OnInit {
  @Input()
  school: School;

  examinations: Examination[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  isLoading: boolean = true;

  constructor(private currentItems: CurrentItems,
              private _dialog: MsfModal,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService,
              private _examinationLoader: ExaminationLoader,
              private _router: Router) {
  }

  async ngOnInit() {
    try {
      await this._examinationLoader.loadBySchool(this.school);
      this.table.unshift(...this.school.examinations.toArray());
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }

  add() {
    this.service.add(this.school).then(examination => {
      if (examination) {
        this.table.unshift(examination);
      }
    })
  }
}
