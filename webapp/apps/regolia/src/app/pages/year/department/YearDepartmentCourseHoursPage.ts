import {YearDepartment} from "@examination/entities";
import {Component, Input, ViewChild} from "@angular/core";
import {CourseHourList, CourseHourService} from "@examination/components";
import {CurrentItems} from "../../../current-items";


@Component({
  template: `
     <MsActionMenu class="p-2 ms-depth-8"> 
         <button MsActionMenuButton icon="Add" theme="primary" (click)="addCourseHour()">Ajouter un horaire</button>
     </MsActionMenu>

     <h3 class="my-2">Horaires</h3>
    
    <CourseHourList [params]="{yearDepartmentId: yearDepartment.id}"></CourseHourList>
  `
})
export class YearDepartmentCourseHoursPage {
  @Input()
  yearDepartment: YearDepartment;

  @ViewChild(CourseHourList)
  list: CourseHourList;

  constructor(private _service: CourseHourService, items: CurrentItems) {
    this.yearDepartment = items.get('yearDepartment');
  }

  addCourseHour() {
    // this._service.add.then(item => {
    //   if(item) {
    //     this.list.addCourseHour(item);
    //   }
    // });
  }

}
