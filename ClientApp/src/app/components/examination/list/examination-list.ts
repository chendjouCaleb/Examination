import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {Examination, ExaminationLoader, School} from 'examination/models';
import {Router} from '@angular/router';
import {MsfModal} from 'fabric-docs';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from '../examination.service.contract';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.html'
})
export class ExaminationList implements OnInit {

  @Input()
  school: School;

  @Output()
  linkClick = new EventEmitter<Examination>();

  constructor(private currentItems: CurrentItems,
              private _dialog: MsfModal,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService,
              private _examinationLoader: ExaminationLoader,
              private _router: Router) {
  }

  ngOnInit() {
    this._examinationLoader.loadBySchool(this.school);
  }

  onClick(event: Event, item: Examination) {
    event.preventDefault();
    this.linkClick.emit(item);
  }
}
