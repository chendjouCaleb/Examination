import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Department, Speciality} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";
import {SpecialityAddBody, SpecialityAddParams} from "../../form";


@Injectable()
export class SpecialityHttpClient extends GenericHttpClient<Speciality, number> {
  url: string = SERVER_URL + "/specialities";


  createFromAny(value: any): Speciality {
    return new Speciality(value);
  }

  async findByName(department: Department, name: string): Promise<Speciality> {
    const result = this.httpClient.get(`${this.url}/find/name?departmentId=${department.id}&name=${name}`).toPromise();
    if(result) {
      return new Speciality(result);
    }
    return null;
  }

  async addSpeciality(department: Department, body: SpecialityAddBody, params: SpecialityAddParams) {
    return this.add(body, {...params, departmentId: department.id});
  }

  listByDepartment(department: Department): Promise<List<Speciality>> {
    return this.listAsync({departmentId: department.id});
  }

}
