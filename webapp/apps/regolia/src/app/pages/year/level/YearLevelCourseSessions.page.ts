import {Component, ViewChild} from "@angular/core";
import {YearLevel} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {CourseSessionList, CourseSessionService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()">Programmer une session</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Cours</h3>
    <div>
        <CourseSessionList [params]="{yearLevelId: yearLevel.id}" 
                            [hiddenColumns]="['year', 'year', 'level', 'level']">
            
        </CourseSessionList>
    </div>
  `
})
export class YearLevelCourseSessionsPage {
  yearLevel: YearLevel;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;


  constructor(private service: CourseSessionService,
              private currentsItems: CurrentItems) {
    this.yearLevel = currentsItems.get('yearLevel');
  }

  addAll() {

  }

  refresh() {
    this.list.refresh();
  }
}
