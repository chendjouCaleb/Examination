import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Room, Organisation} from "../entities";
import {RoomHttpClient, UserHttpClient} from "../httpClient";
import {OrganisationLoader} from "./organisation.loader";
import {List} from "@positon/collections";


@Injectable({providedIn: "root"})
export class RoomLoader implements EntityLoader<Room, number> {

  constructor(private roomRepository: RoomHttpClient,
              private _userHttClient: UserHttpClient,
              private _organisationLoader: OrganisationLoader) {
  }

  async load(item: Room): Promise<Room> {
    if(item.registerUserId){
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.organisation = await this._organisationLoader.loadById(item.organisationId);
    return item;
  }

  async loadById(id: number): Promise<Room> {
    const item = await this.roomRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByOrganisation(organisation: Organisation): Promise<List<Room>> {
    const rooms = await this.roomRepository.listAsync({organisationId: organisation.id});
    for (const room of rooms) {
      await this.load(room);
    }

    return rooms;
  }
}
