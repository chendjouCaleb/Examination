import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paging} from "../paging";
import {List} from "@positon/collections";
import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {User} from "../entities/public_api";
import {Injectable} from "@angular/core";


@Injectable()
export class UserHttpClient extends GenericHttpClient<User, string> {
  url: string = SERVER_URL + "/users";

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  createFromAny(value: any): User {
    return User.createFromAny(value);
  }

  paging(paging: any = {pageSize: "10", currentPage: "1"}): Observable<Paging<User>> {
    return this.httpClient.get(this.url + "/paging", {params: paging})
      .pipe(map(value => {
        const page = Paging.fromAny<User>(value);
        const list = new List<User>();
        page.items.forEach(i => list.add(User.createFromAny(i)));
        page.items = list;
        return page;
      }));
  }

  async findByEmail(email: string): Promise<User> {
    return await this.httpClient
      .get(this.url + "/find", {params: {email}})
      .pipe(map(value => this.createFromAny(value)))
      .toPromise();
  }

  findByUsername(username: string): Promise<User> {
    return this.httpClient.get(this.url + "/find", {params: {username}})
      .pipe(map(value => this.createFromAny(value)))
      .toPromise();
  }

  findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.httpClient.get(this.url + "/find", {params: {phoneNumber}})
      .pipe(map(value => this.createFromAny(value))).toPromise();
  }

  updateEmail(user: User, email: string): Promise<any> {
    return this.httpClient
      .put(`${this.url}/${user.id}/email`, {}, {params: {email}})
      .toPromise();
  }

  updateUsername(user: User, username: string): Promise<any> {
    return this.httpClient
      .put(`${this.url}/${user.id}/username`, {}, {params: {username}})
      .toPromise();
  }

  updatePhoneNumber(user: User, phoneNumber: string): Promise<any> {
    return this.httpClient
      .put(`${this.url}/${user.id}/phoneNumber`, {}, {params: {phoneNumber}})
      .toPromise();

  }


  checkPassword(accountId: string, password: string): Promise<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = "password=" + password;
    return this.httpClient.post(`${this.url}/${accountId}/password/check`, body, {headers}).toPromise();
  }

  // todo image download and upload.

  async clear() {
    let users = await this.listAsync();

    for (const user of users) {
      if (user.email != 'chendjou2016@outlook.fr') {
        await this.delete(user.id);
      }
    }
  }

}
