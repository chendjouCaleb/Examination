import {Entity} from "../entities";
import {GenericHttpClient} from "examination/models";
import {List} from "@positon/collections";

export abstract class Loader<T extends Entity<TID>, TID> {

  constructor(protected _httpClient: GenericHttpClient<T, TID> ) {}
  abstract load(item: T): Promise<T>;

  async loadById(id: TID): Promise<T> {
    return await this.load(await this._httpClient.findAsync(id));
  }

  async loadAll(groups: List<T>) {
    for (const group of groups) {
      await this.load(group);
    }
  }
}
