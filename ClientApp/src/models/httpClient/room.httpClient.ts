import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Room, Organisation} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class RoomHttpClient extends GenericHttpClient<Room, number> {
  url: string = SERVER_URL + "/rooms";


  createFromAny(value: any): Room {
    return new Room(value);
  }

  async findByName(organisation: Organisation, name: string): Promise<Room> {
    const result = this.httpClient.get(`${this.url}/find?organisationId=${organisation.id}&name=${name}`).toPromise();
    if(result) {
      return new Room(result);
    }
    return null;
  }


}
