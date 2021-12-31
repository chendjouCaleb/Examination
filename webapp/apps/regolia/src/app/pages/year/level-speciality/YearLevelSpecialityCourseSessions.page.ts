import {Component, ViewChild} from "@angular/core";
import {YearLevelSpeciality} from "@examination/models/entities";
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
        <CourseSessionList [params]="{yearLevelSpecialityId: yearLevelSpeciality.id}" 
                            [hiddenColumns]="['year', 'year', 'levelSpeciality', 'levelSpeciality']">
            
        </CourseSessionList>
    </div>
  `
})
export class YearLevelSpecialityCourseSessionsPage {
  yearLevelSpeciality: YearLevelSpeciality;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;


  constructor(private service: CourseSessionService,
              private currentsItems: CurrentItems) {
    this.yearLevelSpeciality = currentsItems.get('yearLevelSpeciality');
  }

  addAll() {

  }

  refresh() {
    this.list.refresh();
  }
}
