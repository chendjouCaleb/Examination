import {Component, ViewChild} from "@angular/core";
import {YearLevel} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterCourseList, SemesterCourseService, YearStudentList, YearStudentService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()"> Ajouter des étudiants</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Étudiants</h3>
    <div >
        <YearStudentList [params]="{yearLevelId: yearLevel.id}"></YearStudentList>
    </div>
  `
})
export class YearLevelStudentsPage {
  yearLevel: YearLevel;

  @ViewChild(YearStudentList)
  list: YearStudentList;

  constructor(
              private service: YearStudentService,
              private currentsItems: CurrentItems) {
    this.yearLevel = currentsItems.get('yearLevel');
  }

  refresh() {
    this.list.refresh();
  }

  addAll() {
    this.service.addAllLevel(this.yearLevel).subscribe(items => {
      if(items) {
        this.list.addItems(...items);
      }
    })
  }
}
