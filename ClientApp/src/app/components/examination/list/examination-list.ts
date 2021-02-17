import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  constructor(private currentItems: CurrentItems,
              private _dialog: MsfModal,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService,
              private _examinationLoader: ExaminationLoader,
              private _router: Router) {
  }

  async ngOnInit() {
    await this._examinationLoader.loadBySchool(this.school);
    this.table.unshift(...this.school.examinations.toArray());
  }

  add() {
    this.service.add(this.school).then(examination => {
      if (examination) {
        this.table.unshift(examination);
      }
    })
  }
}
