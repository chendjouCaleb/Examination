import {Component, ViewChild} from "@angular/core";
import {YearLevel} from "@examination/models/entities";
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
        <SemesterCourseList [params]="params" [hiddenColumns]="['year', 'department', 'level']">
        </SemesterCourseList>
    </div>
  `
})
export class YearLevelCoursesPage {

  params: any;

  yearLevel: YearLevel;

  @ViewChild(SemesterCourseList)
  list: SemesterCourseList;


  constructor(
              private service: SemesterCourseService,
              private currentsItems: CurrentItems) {
    this.yearLevel = currentsItems.get('yearLevel');
    this.params = {yearLevelId: this.yearLevel.id};
  }

  refresh() {
    this.list.refresh();
  }
}
