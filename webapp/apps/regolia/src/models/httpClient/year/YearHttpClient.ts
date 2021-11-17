import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {School, Year, YearDepartment} from "examination/entities";
import {YearAddModel} from "../../form/year.model";
import {List} from "@positon/collections";

@Injectable()
export class YearHttpClient extends GenericHttpClient<Year, number> {
  url: string = SERVER_URL + '/years';

  async add(school: School, body: YearAddModel): Promise<Year> {
    return await this.addAsync(body, {schoolId: school.id});
  }

  listBySchool(school: School): Promise<List<Year>> {
    return this.list({schoolId: school.id});
  }


  createFromAny(value: any): Year {
    return new Year(value);
  }
}
