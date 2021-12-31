import {SemesterLevelSpeciality} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseHourList, CourseHourService} from "@examination/components";
import {CurrentItems} from "../../../current-items";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseHour()">Ajouter un horaire</button>
     </MsActionMenu>

     <h3 class="my-2">Horaires</h3>
    
    <CourseHourList [params]="{semesterLevelSpecialityId: semesterLevelSpeciality.id}"></CourseHourList>
  `,
  selector: 'SemesterCourseHoursPage'
})
export class SemesterLevelSpecialityCourseHoursPage {
  @Input()
  semesterLevelSpeciality: SemesterLevelSpeciality;

  @ViewChild(CourseHourList)
  list: CourseHourList;

  constructor(private _service: CourseHourService, items: CurrentItems) {
    this.semesterLevelSpeciality = items.get('semesterLevelSpeciality');
  }

  addCourseHour() {

  }

}
