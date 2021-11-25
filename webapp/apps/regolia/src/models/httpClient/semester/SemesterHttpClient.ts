import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {School, Semester, Year} from "examination/entities";
import {SemesterAddModel} from "../../form";
import {List} from "@positon/collections";

@Injectable()
export class SemesterHttpClient extends GenericHttpClient<Semester, number> {
  url: string = SERVER_URL + '/semesters';

  async add(year: Year, body: SemesterAddModel): Promise<Semester> {
    return await this.addAsync(body, {yearId: year.id});
  }

  listBySchool(school: School): Promise<List<Semester>> {
    return this.list({schoolId: school.id});
  }

  listByYear(year: Year): Promise<List<Semester>> {
    return this.list({yearId: year.id});
  }


  createFromAny(value: any): Semester {
    return new Semester(value);
  }
}
