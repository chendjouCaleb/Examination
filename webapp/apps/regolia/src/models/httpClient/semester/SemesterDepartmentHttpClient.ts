import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Department, YearDepartment, SemesterDepartment, Semester} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class SemesterDepartmentHttpClient extends GenericHttpClient<SemesterDepartment, number> {
  url: string = SERVER_URL + '/semesterDepartments';

  createFromAny(value: any): SemesterDepartment {
    return new SemesterDepartment(value);
  }

  listByDepartment(department: Department): Promise<List<SemesterDepartment>> {
    return this.list({departmentId: department.id});
  }

  listBySemester(semester: Semester): Promise<List<SemesterDepartment>> {
    return this.list({semesterId: semester.id});
  }

  listByYearDepartment(yearDepartment: YearDepartment): Promise<List<SemesterDepartment>> {
    return this.list({yearDepartmentId: yearDepartment.id});
  }
}
