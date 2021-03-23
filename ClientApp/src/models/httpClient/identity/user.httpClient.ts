import {GenericHttpClient} from '../httpClient';

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {User, UserModel} from 'examination/entities';


@Injectable()
export class UserHttpClient extends GenericHttpClient<User, string> {
  url: string = environment.AUTH_SERVER_URL + '/users';


  createFromAny(value: any): User {
    return User.createFromAny(value);
  }

  searchFn: (filter: string, take: number) => Promise<User[]> = async (filter: string, take) => (await this.paging(filter, take));

  async paging(filter: string, take: number = 5): Promise<Array<User>> {
    const itemResult = await this.httpClient
      .get<Array<User>>(this.url, {params: {filter, take: String(take)}})
      .toPromise();

    return itemResult.map(i => User.createFromAny(i));
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.httpClient.get(this.url + '/find', {params: {email}}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  async findByUsername(username: string): Promise<User> {
    const result = await this.httpClient.get(this.url + '/find', {params: {username}}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const result = await this.httpClient.get(this.url + '/find', {params: {phoneNumber}}).toPromise();
    return result != null ? User.createFromAny(result) : null;
  }

  checkPassword(userId: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'password=' + password;
    return this.httpClient.post(`${this.url}/${userId}/password/check`, body, {headers});
  }

  userModel(userId: string): Promise<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.SERVER_URL}/users/${userId}/model`).toPromise();
  }

  setImageUrl(user: User) {
    if (user.hasImage) {
      user.imageUrl = `${environment.AUTH_SERVER_URL}/users/${user.id}/image`;
    }
  }
}

export interface Paging<T> {
  items: T[];
}
