import {Room, RoomHttpClient, RoomLoader} from "../../models";
import {AuthorizationManager} from "../authorization/authorization-manager";
import {CurrentItems} from "../current-items";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RoomResolver {

  constructor(private _loader: RoomLoader,
              private items: CurrentItems, private identity: AuthorizationManager ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Room> {
    const id = +route.paramMap.get("roomId");

    const item = await this._loader.loadById(id);
    this.items.put("room", item);

    return item;

  }
}
