import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterCourseHttpClient} from "@examination/models/http";
import {SemesterDepartment, SemesterCourse, Semester} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterCourseList, SemesterCourseService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter des cours</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Cours</h3>
    <div >
        <SemesterCourseList [params]="{semesterId: semester.id}" [hiddenColumns]="['semester', 'year']">
            
        </SemesterCourseList>
    </div>
  `
})
export class SemesterCoursePage {

  semester: Semester;

  @ViewChild(SemesterCourseList)
  list: SemesterCourseList;


  constructor(private _httpClient: SemesterCourseHttpClient,
              private service: SemesterCourseService,
              private currentsItems: CurrentItems) {
    this.semester = currentsItems.get('semester');
  }


  addAll() {
    this.service.addSemesterCourses(this.semester).subscribe(items => {
      if(items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
