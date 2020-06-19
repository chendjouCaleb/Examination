import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Student, StudentHttpClient, StudentLoader} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";
import {StudentHub} from "examination/app/student/student-hub";


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
              private _hub: StudentHub,
              ) {
    this.examination = currentItems.get('examination');
  }

}
