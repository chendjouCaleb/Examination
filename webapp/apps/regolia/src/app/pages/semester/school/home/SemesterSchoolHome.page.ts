import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {
  Semester,
  SemesterDepartment,
  SemesterDepartmentHttpClient,
  SemesterDepartmentLoader, SemesterLevel, SemesterLevelLoader, SemesterSpeciality, SemesterSpecialityLoader,
  YearDepartment, YearLevel, YearSpeciality
} from "examination/models";
import {SemesterAddService} from "@examination/components";

@Component({
  templateUrl: 'SemesterSchoolHome.page.html',
})
export class SemesterSchoolHomePage implements OnInit {
  semester: Semester;
  semesterDepartments: SemesterDepartment[];

  semesterLevels: SemesterLevel[];
  semesterSpecialities: SemesterSpeciality[];

  constructor(items: CurrentItems,
              private semesterDepartmentHttpClient: SemesterDepartmentHttpClient,
              private semesterDepartmentLoader: SemesterDepartmentLoader,
              private _semesterLevelLoader: SemesterLevelLoader,
              private _semesterSpecialityLoader: SemesterSpecialityLoader,
              private _service: SemesterAddService) {
    this.semester = items.get('semester');
  }

  async ngOnInit() {
    const semesterDepartments = await this.semesterDepartmentHttpClient
      .list({semesterId: this.semester.id});

    await this.semesterDepartmentLoader.loadAll(semesterDepartments);

    this.semesterDepartments = semesterDepartments.toArray();
    this.semesterLevels = await this._semesterLevelLoader.loadBySemester(this.semester);
    this.semesterSpecialities = await this._semesterSpecialityLoader.loadBySemester(this.semester);

    for (let semesterDepartment of this.semesterDepartments) {
      semesterDepartment.semesterLevels = this.semesterLevels.filter(yl => yl.semesterDepartmentId == semesterDepartment.id);
      semesterDepartment.semesterSpecialities = this.semesterSpecialities.filter(yl => yl.semesterDepartmentId == semesterDepartment.id);
    }
  }



  changeDate() {

  }
}
