import {SemesterCourse, SemesterDepartment, SemesterLevel} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseHourList, CourseHourService, SemesterCourseService} from "@examination/components";
import {CurrentItems} from "../../../current-items";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseHour()">Ajouter un horaire</button>
     </MsActionMenu>

     <h3 class="my-2">Horaires</h3>
    
    <CourseHourList [params]="{semesterDepartmentId: semesterDepartment.id}"></CourseHourList>
  `
})
export class SemesterDepartmentCourseHoursPage {
  @Input()
  semesterDepartment: SemesterDepartment;

  @ViewChild(CourseHourList)
  list: CourseHourList;

  constructor(private _service: CourseHourService, items: CurrentItems) {
    this.semesterDepartment = items.get('semesterDepartment');
  }

  addCourseHour() {
    // this._service.add.then(item => {
    //   if(item) {
    //     this.list.addCourseHour(item);
    //   }
    // });
  }

}
