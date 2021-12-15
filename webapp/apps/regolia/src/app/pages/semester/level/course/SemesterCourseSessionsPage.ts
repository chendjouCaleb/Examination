import {SemesterCourse} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseSessionList, CourseSessionService} from "@examination/components";
import {locales} from "../../../../../infrastructure/locales";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseSession()">Programmer une séance</button>
     </MsActionMenu>

     <h3 class="my-2">{{locales["course-sessions"]}}</h3>
    
    <CourseSessionList [params]="{semesterCourseId: semesterCourse.id}"></CourseSessionList>
  `,
  selector: 'SemesterCourseSessionsPage'
})
export class SemesterCourseSessionsPage {
  @Input()
  semesterCourse: SemesterCourse;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;

  locales = locales;

  constructor(private _service: CourseSessionService) {

  }

  addCourseSession() {
    this._service.addCourseSession({semesterCourse: this.semesterCourse}).subscribe(item => {
      if(item) {
        this.list.addItem(item);
      }
    });
  }

}
