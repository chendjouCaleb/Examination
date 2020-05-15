import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Speciality, Examination} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class SpecialityHttpClient extends GenericHttpClient<Speciality, number> {
  url: string = SERVER_URL + "/specialities";


  createFromAny(value: any): Speciality {
    return new Speciality(value);
  }

  async findByName(examination: Examination, name: string): Promise<Speciality> {
    const result = this.httpClient.get(`${this.url}/find?examinationId=${examination.id}&name=${name}`).toPromise();
    if(result) {
      return new Speciality(result);
    }
    return null;
  }
}
