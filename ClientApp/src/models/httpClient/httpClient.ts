import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Dictionary, IDictionary, List} from "@positon/collections";
import {environment} from "src/environments/environment";

import * as moment from "moment";
import {Entity} from "../entities";

export const SERVER_URL = environment.SERVER_URL;
export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";


@Injectable()
export abstract class GenericHttpClient<T extends Entity<TID>, TID> {
  protected cache: IDictionary<TID, T>;

  constructor(protected httpClient: HttpClient) {
    this.cache = new Dictionary<TID, T>();
  }

  abstract get url(): string;

  abstract createFromAny(value: any): T;

  findById(id: TID): Observable<T> {
    if (this.cache.containsKey(id)) {
      return of(this.cache.get(id));
    }
    return this.httpClient.get<T>(this.url + "/" + id).pipe(map(value => this.createFromAny(value)));
  }

  async listAsync(queryParams?: any): Promise<List<T>> {
    const result = await this.httpClient.get<T[]>(this.url, {params: queryParams}).toPromise();
    const items = new List<T>();
    result.forEach(v => {
      const item = this.createFromAny(v);
      items.add(item);
      this.cache.put(v.id, item);
    });
    return items;
  }

  async listByIdAsync(id: any[]): Promise<List<T>> {
    const result = await this.httpClient.get<T[]>(this.url, {params: {id}}).toPromise();
    const items = new List<T>();
    result.forEach(v => {
      items.add(this.createFromAny(v));
      this.cache.put(v.id, v);
    });
    return items;
  }

  async findAsync(id: TID): Promise<T> {
    if (this.cache.containsKey(id)) {
      return this.cache.get(id);
    }
    const value = await this.httpClient.get<T>(this.url + "/" + id).toPromise();
    const item = this.createFromAny(value);
    this.cache.put(value.id, item);
    return item;
  }

  async addAsync(model: any, queryParams?: any): Promise<T> {
    let result = await this.httpClient.post<T>(this.url, model, {params: queryParams}).toPromise();
    result = this.createFromAny(result);
    this.cache.put(result.id, result);
    return result;
  }

  async updateAsync(id: TID, model: any, queryParams?: any): Promise<T> {
    await this.httpClient.put<T>(this.url + "/" + id, model, {params: queryParams}).toPromise();

    const item = await this.findAsync(id);
    this.cache.put(id, item);
    return item;
  }

  async deleteAsync(id: TID) {
    this.cache.remove(id);
    return await this.httpClient.delete(this.url + "/" + id).toPromise();
  }

  async list(queryParams?: any): Promise<List<T>> {
    const values = await this.httpClient.get<T[]>(this.url, {params: queryParams}).toPromise();
    const list = new List<T>();
    values.forEach(v => list.add(this.createFromAny(v)));
    return list;
  }

  add(model: any, queryParams?: any): Promise<T> {
    return this.httpClient.post<T>(this.url, model, {params: queryParams})
      .pipe(map(value => this.createFromAny(value)))
      .toPromise();
  }

  update(id: TID, model: any, queryParams?: any): Promise<T> {
    return this.httpClient.put<T>(this.url + "/" + id, model, {params: queryParams})
      .pipe(map(value => this.createFromAny(value)))
      .toPromise();
  }

  delete(id: TID): Promise<any> {
    return this.httpClient.delete(this.url + "/" + id).toPromise();
  }

  formatDate(date: Date) {
    if (!date) {
      return null;
    }

    return moment(date).format(DATE_FORMAT);
  }
}
