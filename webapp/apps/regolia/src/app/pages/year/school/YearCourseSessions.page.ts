import {Component, ViewChild} from "@angular/core";
import {Year} from "@examination/models/entities";
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
    
    <h3 class="mt-3">Séances de cours</h3>
    <div>
        <CourseSessionList [params]="{yearId: year.id}" 
                            [hiddenColumns]="['year',  'department', 'level']">
            
        </CourseSessionList>
    </div>
  `
})
export class YearCourseSessionsPage {
  year: Year;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;


  constructor(
              private service: CourseSessionService,
              private currentsItems: CurrentItems) {
    this.year = currentsItems.get('year');
  }

  addAll() {
    // this.service.addCourseSession({year: this.year}).subscribe(item => {
    //   if(item) {
    //     this.list.addItem(item);
    //   }
    // })
  }

  refresh() {
    this.list.refresh();
  }
}
