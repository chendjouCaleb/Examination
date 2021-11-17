import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Department, School, Year, YearDepartment} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearDepartmentHttpClient extends GenericHttpClient<YearDepartment, number> {
  url: string = SERVER_URL + '/yearDepartments';

  createFromAny(value: any): YearDepartment {
    return new YearDepartment(value);
  }

  listByDepartment(department: Department): Promise<List<YearDepartment>> {
    return this.list({departmentId: department.id});
  }

  listByYear(year: Year): Promise<List<YearDepartment>> {
    return this.list({yearId: year.id});
  }
}
