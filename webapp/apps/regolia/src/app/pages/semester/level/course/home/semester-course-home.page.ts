import {Component, Input, ViewChild} from '@angular/core';
import {SemesterCourse} from 'examination/entities';
import {Router} from '@angular/router';
import {SemesterCourseService, SemesterCourseTeacherList} from "@examination/components";
import {SemesterCourseTeacherService} from "@examination/components";

@Component({
  templateUrl: 'semester-course-home.page.html',
  selector: 'SemesterCourseHomePage'
})
export class SemesterCourseHomePage {
  @Input()
  semesterCourse: SemesterCourse;

  @ViewChild('courseTeacherList')
  courseTeacherList: SemesterCourseTeacherList;

  constructor(private router: Router, private _service: SemesterCourseService,
              private _courseTeacherService: SemesterCourseTeacherService) {
  }

  delete() {
    this._service.delete(this.semesterCourse).subscribe(deleted => {
      if(deleted) {
        this.router.navigateByUrl(`${this.semesterCourse.semesterLevel?.url('courses')}`)
      }
    })
  }

  addTeacher() {
    this._courseTeacherService.add(this.semesterCourse, this.courseTeacherList.table.items)
      .subscribe(semesterCourseTeacher => {
        if(semesterCourseTeacher) {
          this.courseTeacherList.addItems(semesterCourseTeacher);
        }
      })
  }
}
