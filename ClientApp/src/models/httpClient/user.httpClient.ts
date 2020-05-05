import {GenericHttpClient} from "./httpClient";
import {User} from "../entities";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";


@Injectable()
export class UserHttpClient extends GenericHttpClient<User, string> {
  url: string = environment.AUTH_SERVER_URL + "/users";


  createFromAny(value: any): User {
    return User.createFromAny(value);
  }


  async findByEmail(email: string): Promise<User> {
    const result = await this.httpClient.get(this.url + "/find", {params: { email }}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  async findByUsername(username: string): Promise<User> {
    const result = await this.httpClient.get(this.url + "/find", {params: { username }}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const result = await this.httpClient.get(this.url + "/find", {params: { phoneNumber }}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  checkPassword(userId: string, password: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = "password=" + password;
    return this.httpClient.post(`${this.url}/${userId}/password/check`, body,  {headers});
  }
}