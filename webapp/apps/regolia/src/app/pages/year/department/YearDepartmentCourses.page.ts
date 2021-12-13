import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterCourseHttpClient} from "@examination/models/http";
import {SemesterDepartment, SemesterCourse, Semester, Year, YearDepartment} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterCourseList, SemesterCourseService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Cours</h3>
    <div >
        <SemesterCourseList [params]="params" [hiddenColumns]="['year', 'department']">
            
        </SemesterCourseList>
    </div>
  `
})
export class YearDepartmentCoursesPage {

  params: any;

  yearDepartment: YearDepartment;

  @ViewChild(SemesterCourseList)
  list: SemesterCourseList;


  constructor(
              private service: SemesterCourseService,
              private currentsItems: CurrentItems) {
    this.yearDepartment = currentsItems.get('yearDepartment');
    this.params = {yearDepartmentId: this.yearDepartment.id};
  }

  refresh() {
    this.list.refresh();
  }
}
