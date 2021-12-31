import {Component, ViewChild} from "@angular/core";
import {YearSpeciality} from "@examination/models/entities";
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
        <CourseSessionList [params]="{yearSpecialityId: yearSpeciality.id}" 
                            [hiddenColumns]="['year', 'year', 'speciality', 'speciality']">
            
        </CourseSessionList>
    </div>
  `
})
export class YearSpecialityCourseSessionsPage {
  yearSpeciality: YearSpeciality;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;


  constructor(private service: CourseSessionService,
              private currentsItems: CurrentItems) {
    this.yearSpeciality = currentsItems.get('yearSpeciality');
  }

  addAll() {

  }

  refresh() {
    this.list.refresh();
  }
}
