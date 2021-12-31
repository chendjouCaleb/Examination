import {SemesterCourse, SemesterLevel} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseHourList, CourseHourService, SemesterCourseService} from "@examination/components";
import {CurrentItems} from "../../../current-items";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseHour()">Ajouter un horaire</button>
     </MsActionMenu>

     <h3 class="my-2">Horaires</h3>
    
    <CourseHourList [params]="{semesterLevelId: semesterLevel.id}"></CourseHourList>
  `,
  selector: 'SemesterCourseHoursPage'
})
export class SemesterLevelCourseHoursPage {
  @Input()
  semesterLevel: SemesterLevel;

  @ViewChild(CourseHourList)
  list: CourseHourList;

  constructor(private _service: CourseHourService, items: CurrentItems) {
    this.semesterLevel = items.get('semesterLevel');
  }

  addCourseHour() {
    this._service.addCourseHour(this.semesterLevel).then(item => {
      if(item) {
        this.list.addCourseHour(item);
      }
    });
  }

}
