import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Student, StudentHttpClient, StudentLoader} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";


@Component({
  templateUrl: 'student-list.page.html',
  selector: 'student-list'
})
export class StudentListPage {

  examination: Examination;
  specialities: List<Student>;

  constructor(private currentItems: CurrentItems,
              private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {
    this.examination = currentItems.get('examination');
  }

}
