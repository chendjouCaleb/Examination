import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Speciality, YearDepartment, YearSpeciality} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearSpecialityHttpClient extends GenericHttpClient<YearSpeciality, number> {
  url: string = SERVER_URL + '/yearSpecialities';

  createFromAny(value: any): YearSpeciality {
    return new YearSpeciality(value);
  }

  listBySpeciality(speciality: Speciality): Promise<List<YearSpeciality>> {
    return this.list({specialityId: speciality.id});
  }

  listByYearDepartment(yearDepartment: YearDepartment): Promise<List<YearSpeciality>> {
    return this.list({yearDepartmentId: yearDepartment.id});
  }
}
