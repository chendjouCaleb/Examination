import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {environment} from 'src/environments/environment';

import moment from 'moment';
import {Entity} from '../entities';
import {ItemListModel, ItemListResult} from './itemList';
import {HttpClientCache} from './httpClient-cache';

export const SERVER_URL = environment.SERVER_URL;
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';


@Injectable()
export abstract class GenericHttpClient<T extends Entity<TID>, TID> {


  constructor(protected httpClient: HttpClient) { }

  get cache(): Map<TID, T> {
    return HttpClientCache.instance.get(this.url);
  }

  abstract get url(): string;

  abstract createFromAny(value: any): T;

  findById(id: TID): Observable<T> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id));
    }
    return this.httpClient.get<T>(this.url + '/' + id).pipe(map(value => {
      const result = this.createFromAny(value);
      this.cache.set(result.id, result);
      return result;
    }));
  }

  async listAsync(queryParams?: any): Promise<List<T>> {
    const result = await this.httpClient.get<T[]>(this.url, {params: queryParams}).toPromise();
    const items = new List<T>();
    result.forEach(v => {
      const item = this.createFromAny(v);
      items.add(item);
      // this.cache.set(v.id, item);
    });
    return items;
  }

  count(queryParams?: any): Promise<number> {
   return this.httpClient.get<number>(this.url + '/count', {params: queryParams}).toPromise();
  }

  async itemList(queryParams: any, itemParams: ItemListModel = {}): Promise<ItemListResult<T>> {
    const result = await this.httpClient.get<ItemListResult<T>>(this.url, {
      params: {
        ...queryParams,
        itemParams
      }
    }).toPromise();
    const items = new List<T>();
    result.items.forEach(v => {
      const item = this.createFromAny(v);
      items.add(item);
      // this.cache.set(v.id, item);
    });
    result.items = items;
    return result;
  }

  async listByIdAsync(id: any[]): Promise<List<T>> {
    const result = await this.httpClient.get<T[]>(this.url, {params: {id}}).toPromise();
    const items = new List<T>();
    result.forEach(v => {
      items.add(this.createFromAny(v));
      this.cache.set(v.id, v);
    });
    return items;
  }

  async findAsync(id: TID): Promise<T> {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const value = await this.httpClient.get<T>(this.url + '/' + id).toPromise();
    const item = this.createFromAny(value);
    this.cache.set(item.id, item);
    console.log('cached result: ' + this.cache.size);
    return item;
  }

  async refresh(item: T): Promise<void> {
    const value = await this.httpClient.get<T>(`${this.url}/${item.id}`).toPromise();
    item.apply(value);
  }

  getStatistics<TS>(item: T): Promise<TS> {
    return this.httpClient.get<TS>(`${this.url}/${item.id}/statistics`).toPromise();
  }


  async refreshStatistics(item: T): Promise<void> {
    await this.httpClient.put(`${this.url}/${item.id}/statistics`, {}).toPromise();
  }

  async addAsync(model: any, queryParams?: any): Promise<T> {
    let result = await this.httpClient.post<T>(this.url, model, {params: queryParams}).toPromise();
    result = this.createFromAny(result);
    this.cache.set(result.id, result);
    return result;
  }

  async updateAsync(id: TID, model: any, queryParams?: any): Promise<T> {
    await this.httpClient.put<T>(this.url + '/' + id, model, {params: queryParams}).toPromise();

    const item = await this.findAsync(id);
    this.cache.set(id, item);
    return item;
  }

  async deleteAsync(id: TID) {
    this.cache.delete(id);
    return await this.httpClient.delete(this.url + '/' + id).toPromise();
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

  async addRange(model: any, queryParams?: any): Promise<List<T>> {
    const result = await this.httpClient.post<T[]>(this.url, model, {params: queryParams})
      .toPromise();

    const list = new List<T>();

    result.forEach(value => list.add(this.createFromAny(value)));
    return list;
  }

  update(id: TID, model: any, queryParams?: any): Promise<T> {
    return this.httpClient.put<T>(this.url + '/' + id, model, {params: queryParams})
      .pipe(map(value => this.createFromAny(value)))
      .toPromise();
  }

  delete(id: TID): Promise<any> {
    return this.httpClient.delete(this.url + '/' + id).toPromise();
  }

  static formatDate(date: Date) {
    if (!date) {
      return null;
    }

    return moment(date).format(DATE_FORMAT);
  }
}
