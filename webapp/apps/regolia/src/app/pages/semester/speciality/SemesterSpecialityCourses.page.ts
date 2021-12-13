import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {SemesterCourseHttpClient, SemesterCourseLevelSpecialityHttpClient} from "@examination/models/http";
import {SemesterDepartment, SemesterCourse, SemesterSpeciality} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterCourseList, SemesterCourseListFn, SemesterCourseService} from "@examination/components";

@Component({
  template: `
      <div class="br-2 p-2 ms-depth-8">
          <MsActionMenu>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Cours</h3>
      <div>
          <SemesterCourseList [searchFn]="searchFn"
                              [hiddenColumns]="['semester', 'year', 'department', 'specialities']">
          </SemesterCourseList>
      </div>
  `
})
export class SemesterSpecialityCoursesPage implements AfterViewInit, OnInit {
  semesterSpeciality: SemesterSpeciality;

  @ViewChild(SemesterCourseList)
  list: SemesterCourseList;

  searchFn: SemesterCourseListFn;


  constructor(private _httpClient: SemesterCourseLevelSpecialityHttpClient,
              private service: SemesterCourseService,
              private currentsItems: CurrentItems) {
    this.semesterSpeciality = currentsItems.get('semesterSpeciality');
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.searchFn = async () => {
      const items = await this._httpClient.list({semesterSpecialityId: this.semesterSpeciality.id});
      return items.toArray().map(s => s.semesterCourse);
    }
  }

  refresh() {
    this.list.refresh();
  }
}
