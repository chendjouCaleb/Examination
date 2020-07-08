import {TestGroup, TestGroupLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";

@Injectable({
  providedIn: "root"
})
export class TestGroupResolver {

  constructor(private _loader: TestGroupLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TestGroup> {
    const id = +route.paramMap.get("testGroupId");

    const item = await this._loader.loadById(id);
    this.items.put("testGroup", item);

    return item;

  }
}
