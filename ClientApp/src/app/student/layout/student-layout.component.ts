import {Component, Input, OnInit} from '@angular/core';
import {Examination, Student, StudentHttpClient} from 'examination/models';
import {BreadcrumbItem} from 'examination/infrastructure';
import {CurrentItems} from 'examination/app/current-items';
import {Title} from '@angular/platform-browser';
import {StudentService} from "../student.service";
import {Router} from "@angular/router";
import {AlertEmitter, Confirmation} from "examination/controls";

@Component({
  templateUrl: 'student-layout.component.html',
  selector: 'app-student-layout'
})
export class StudentLayoutComponent implements OnInit {
  @Input()
  student: Student;

  examination: Examination;

  @Input()
  title: string;

  paths: BreadcrumbItem[] = [];

  constructor(currentItems: CurrentItems, private _title: Title,
              private _router: Router,
              private _confirmation: Confirmation,
              private _alertEmitter: AlertEmitter,
              private _httpClient: StudentHttpClient,
              public _studentService: StudentService) {
    this.student = currentItems.get('student');
    this.examination = currentItems.get('examination');
  }

  ngOnInit(): void {
    this.paths = [
      {name: 'étudiants', url: `${this.student.examination.url}/students`},
      {name: this.student.fullName, url: `${this.student.url}/home`},
    ];

    if(this.title){
      this._title.setTitle(this.title);
      this.paths.push({name: this.title});
    }
  }

  delete(student: Student) {
    const result = this._confirmation.open('Voulez-vous Supprimer cet étudiant?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(student.id);
      this._router.navigateByUrl(`${this.student.examination.url}/students`);
      this._alertEmitter.info('L\'étudiant a été supprimé!');
    });
  }
}
