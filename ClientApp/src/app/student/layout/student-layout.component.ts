import {Component, Input, OnInit} from '@angular/core';
import {Student} from 'examination/models';
import {BreadcrumbItem} from 'examination/infrastructure';
import {CurrentItems} from 'examination/app/current-items';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'student-layout.component.html',
  selector: 'app-student-layout'
})
export class StudentLayoutComponent implements OnInit {
  @Input()
  student: Student;

  @Input()
  title: string;

  paths: BreadcrumbItem[] = [];

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.student = currentItems.get('student');
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
}
