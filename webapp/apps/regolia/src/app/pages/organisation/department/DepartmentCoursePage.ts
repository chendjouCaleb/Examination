import {Component} from "@angular/core";
import {Course, Department} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <CourseList
      [hiddenColumns]="['department']"
      [addParams]="{ department: department, isAuthorized: department.school.isPlanner}"
      [params]="{departmentId:department.id}"
      [courseUrlFn]="courseUrlFn"></CourseList>`
})
export class DepartmentCoursesPage {
  department: Department;

  courseUrlFn = (course: Course) => `${this.department.url}/courses/${course.id}`;

  constructor(items: CurrentItems, public _router: Router) {
    this.department = items.get('department');
  }
}
