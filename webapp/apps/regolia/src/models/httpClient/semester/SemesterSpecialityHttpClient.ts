import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Speciality, YearDepartment, SemesterSpeciality, SemesterDepartment, YearSpeciality} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class SemesterSpecialityHttpClient extends GenericHttpClient<SemesterSpeciality, number> {
  url: string = SERVER_URL + '/semesterSpecialities';

  createFromAny(value: any): SemesterSpeciality {
    return new SemesterSpeciality(value);
  }

  listBySpeciality(speciality: Speciality): Promise<List<SemesterSpeciality>> {
    return this.list({specialityId: speciality.id});
  }

  listByYearSpeciality(yearSpeciality: YearSpeciality): Promise<List<SemesterSpeciality>> {
    return this.list({yearSpecialityId: yearSpeciality.id});
  }

  listBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<List<SemesterSpeciality>> {
    return this.list({semesterDepartmentId: semesterDepartment.id});
  }
}
