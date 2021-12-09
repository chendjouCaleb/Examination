import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Semester, SemesterDepartment, SemesterDepartmentHttpClient, SemesterDepartmentLoader} from "examination/models";
import {SemesterAddService} from "@examination/components";

@Component({
  templateUrl: 'SemesterSchoolHome.page.html',
})
export class SemesterSchoolHomePage implements OnInit {
  semester: Semester;
  semesterDepartments: SemesterDepartment[];

  constructor(items: CurrentItems,
              private semesterDepartmentHttpClient: SemesterDepartmentHttpClient,
              private semesterDepartmentLoader: SemesterDepartmentLoader,
              private _service: SemesterAddService) {
    this.semester = items.get('semester');
  }

  async ngOnInit() {
    const semesterDepartments = await this.semesterDepartmentHttpClient
      .list({semesterId: this.semester.id});

    await this.semesterDepartmentLoader.loadAll(semesterDepartments);

    this.semesterDepartments = semesterDepartments.toArray();
  }

  addSemester() {

  }

  changeDate() {

  }
}
