import {Test, TestLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";

@Injectable({
  providedIn: "root"
})
export class TestResolver {

  constructor(private _loader: TestLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Test> {
    const id = +route.paramMap.get("testId");

    const item = await this._loader.loadById(id);
    this.items.put("test", item);

    return item;

  }
}
