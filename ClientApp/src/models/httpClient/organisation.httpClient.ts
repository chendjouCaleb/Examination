import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Organisation} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class OrganisationHttpClient extends GenericHttpClient<Organisation, number> {
  url: string = SERVER_URL + "/organisations";


  createFromAny(value: any): Organisation {
    return new Organisation(value);
  }

  async findByIdentifier(identifier: string): Promise<Organisation> {
    const result = this.httpClient.get(`${this.url}/find/identifier/${identifier}`).toPromise();
    if(result) {
      return new Organisation(result);
    }
    return null;
  }

  async clear() {
    let Organisations = await this.listAsync();
    for (const Organisation of Organisations) {
      await this.delete(Organisation.id);
    }
  }

}
