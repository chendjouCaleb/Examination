import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {CourseTeacher, SemesterCourseTeacher} from 'examination/entities';
import {SemesterCourseTeacherLoader} from 'examination/loaders';
import {MsTable} from "@ms-fluent/components";
import {SemesterCourseTeacherHttpClient} from "@examination/http";
import {SemesterCourseTeacherService} from "../SemesterCourseTeacher.service";


@Component({
  templateUrl: 'SemesterCourseTeacherList.html',
  selector: 'SemesterCourseTeacherList'
})
export class SemesterCourseTeacherList implements AfterViewInit {
  @Input()
  params: any;

  @Input()
  hiddenColumns: string[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  courseTeachers: SemesterCourseTeacher[] = [];


  constructor( private _httpClient: SemesterCourseTeacherHttpClient,
    private _service: SemesterCourseTeacherService,
    private _courseTeacherLoader: SemesterCourseTeacherLoader) {
  }

  async ngAfterViewInit() {
    const items = await this._httpClient.list(this.params);
    this.table.unshift(...items.toArray());

    for (let item of items) {
      await this._courseTeacherLoader.load(item);
    }
  }

  async ngOnInit() {

  }

  async addItems(...items: SemesterCourseTeacher[]) {
    this.table.unshift(...items);
    for (let item of items) {
      await this._courseTeacherLoader.load(item);
    }
  }


  delete(item: SemesterCourseTeacher) {
    this._service.delete(item).subscribe(result => {
      if(result) {
        this.table.remove(item);
      }
    })
  }

  deleteTutorialRole(item: SemesterCourseTeacher) {
    this._service.deleteTutorialRole(item);
  }

  addTutorialRole(item: SemesterCourseTeacher) {
    this._service.addTutorialRole(item);
  }

  addLectureRole(item: SemesterCourseTeacher) {
    this._service.addLectureRole(item);
  }

  deleteLectureRole(item: SemesterCourseTeacher) {
    this._service.deleteLectureRole(item);
  }

  principal(item: SemesterCourseTeacher) {
    this._service.principal(item, this.table.items);
  }
}
