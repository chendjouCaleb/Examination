import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Examination, Speciality} from "../entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


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

  listByExamination(examination: Examination): Promise<List<Speciality>> {
    return this.listAsync({examinationId: examination.id});
  }
}
