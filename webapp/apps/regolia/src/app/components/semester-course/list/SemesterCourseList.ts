import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SemesterCourse, YearTeacher} from 'examination/entities';
import {CourseLevelSpecialityLoader, LevelSpecialityLoader, SemesterCourseLoader} from 'examination/loaders';
import {MsPaginator, MsTable} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {SemesterCourseHttpClient} from "@examination/http";
import {diffColors} from "examination/infrastructure";

export type SemesterCourseListFn = () => Promise<SemesterCourse[]>;

@Component({
  templateUrl: 'SemesterCourseList.html',
  selector: 'SemesterCourseList'
})
export class SemesterCourseList implements OnInit {
  @Input()
  params: any;

  @Input()
  searchFn: SemesterCourseListFn;

  @Input()
  hiddenColumns: string[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  paginator: MsPaginator<SemesterCourse>;

  items: SemesterCourse[] = [];

  colors = diffColors;

  constructor(
    private _alertEmitter: AlertEmitter,
    private _httpClient: SemesterCourseHttpClient,
    private _levelSpecialityLoader: LevelSpecialityLoader,
    private _courseLevelSpeciality: CourseLevelSpecialityLoader,
    private _semesterCourseLoader: SemesterCourseLoader) {

  }

  async ngOnInit() {
    if (!this.searchFn) {
      this.searchFn = async () => {
        const items = await this._httpClient.list(this.params);
        return items.toArray();
      }
    }
    this.items = await this.searchFn();
    this.loadCourses(this.items);
  }

  addItems(...items: SemesterCourse[]) {
    this.table.unshift(...items);
    this.loadCourses(items);
  }

  async loadCourses(items: SemesterCourse[]) {
    for (const course of items) {
      await this._semesterCourseLoader.load(course);
    }
  }

  async refresh() {
    this.items = await this.searchFn();
    this.paginator.reset(0);
    this._alertEmitter.info('Liste actualisée.')
  }
}
