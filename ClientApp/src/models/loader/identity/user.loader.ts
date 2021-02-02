import {Injectable} from "@angular/core";

import {
  Examination,  User
} from "examination/entities";

import {List} from "@positon/collections";
import {EntityLoader} from "../entity-loader.interface";
import {UserHttpClient} from "examination/models/http";



@Injectable({providedIn: "root"})
export class UserLoader implements EntityLoader<User, string> {

  constructor(private _httpClient: UserHttpClient ) {
  }

  async load(item: User): Promise<User> {
    const userModel = await this._httpClient.userModel(item.id);

    item.examinations = List.fromArray(userModel.examinations.map(e => new Examination(e)));

    return item;
  }

  async loadById(id: string): Promise<User> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }


  async loadAll(users: List<User>) {
    for (const user of users) {
      await this.load(user);
    }
  }
}
