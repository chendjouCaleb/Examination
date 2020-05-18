import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Group, Organisation, Examination, Speciality} from "../entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


@Injectable()
export class GroupHttpClient extends GenericHttpClient<Group, number> {
  url: string = SERVER_URL + "/groups";


  createFromAny(value: any): Group {
    return new Group(value);
  }

  async findByName(examination: Examination, name: string): Promise<Group> {
    const result = this.httpClient.get(`${this.url}/find?examinationId=${examination.id}&name=${name}`).toPromise();
    if(result) {
      return new Group(result);
    }
    return null;
  }

  listByExamination(examination: Examination): Promise<List<Group>> {
    return this.listAsync({examinationId: examination.id});
  }


  listBySpeciality(speciality: Speciality): Promise<List<Group>> {
    return this.listAsync({specialityId: speciality.id});
  }
}
