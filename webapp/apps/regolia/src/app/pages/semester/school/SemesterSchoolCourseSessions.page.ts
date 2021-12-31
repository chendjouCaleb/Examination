import {Component, ViewChild} from "@angular/core";
import {SemesterCourseHttpClient} from "@examination/models/http";
import {Semester} from "@examination/models/entities";
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
        <CourseSessionList [params]="{semesterId: semester.id}" 
                            [hiddenColumns]="['semester', 'year', 'department', 'level']">
            
        </CourseSessionList>
    </div>
  `
})
export class SemesterSchoolCourseSessionsPage {
  semester: Semester;

  @ViewChild(CourseSessionList)
  list: CourseSessionList;


  constructor(private _httpClient: SemesterCourseHttpClient,
              private service: CourseSessionService,
              private currentsItems: CurrentItems) {
    this.semester = currentsItems.get('semester');
  }

  addAll() {
    this.service.addCourseSession({semester: this.semester}).subscribe(item => {
      if(item) {
        this.list.addItem(item);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
