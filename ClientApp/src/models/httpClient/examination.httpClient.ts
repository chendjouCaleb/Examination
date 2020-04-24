import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Examination, Organisation} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class ExaminationHttpClient extends GenericHttpClient<Examination, number> {
  url: string = SERVER_URL + "/examinations";


  createFromAny(value: any): Examination {
    return new Examination(value);
  }

  async findByName(organisation: Organisation, name: string): Promise<Examination> {
    const result = this.httpClient.get(`${this.url}/find?organisationId=${organisation.id}&name=${name}`).toPromise();
    if(result) {
      return new Examination(result);
    }
    return null;
  }


}
