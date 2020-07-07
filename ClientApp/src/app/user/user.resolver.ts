import {User, UserHttpClient, UserLoader} from "examination/models";
import {CurrentItems} from "../current-items";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserResolver {

  constructor(private _loader: UserLoader,
              private _httpClient: UserHttpClient,
              private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    const id = route.paramMap.get("userId");

    let item: User;
    item = await this._loader.loadById(id);

    this.items.put("user", item);

   // this._loader.load(item).then(() => console.log("User data is loaded"));

    return item;
  }
}
