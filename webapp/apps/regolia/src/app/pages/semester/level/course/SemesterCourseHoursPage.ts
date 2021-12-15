import {SemesterCourse} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseHourList, CourseHourService, SemesterCourseService} from "@examination/components";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseHour()">Ajouter un horaire</button>
     </MsActionMenu>

     <h3 class="my-2">Horaires</h3>
    
    <CourseHourList [params]="{semesterCourseId: semesterCourse.id}"></CourseHourList>
  `,
  selector: 'SemesterCourseHoursPage'
})
export class SemesterCourseHoursPage {
  @Input()
  semesterCourse: SemesterCourse;

  @ViewChild(CourseHourList)
  list: CourseHourList;

  constructor(private _service: CourseHourService) {

  }

  addCourseHour() {
    this._service.addCourseHour(this.semesterCourse.semesterLevel).then(item => {
      if(item) {
        this.list.addCourseHour(item);
      }
    });
  }

}
